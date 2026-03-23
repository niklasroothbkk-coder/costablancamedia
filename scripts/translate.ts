import fs from 'fs';
import path from 'path';

const DEEPL_API_KEY = process.env.DEEPL_API_KEY || 'ee522a09-d5d8-4dc9-b615-16996ca301db:fx';
const DEEPL_URL = 'https://api-free.deepl.com/v2/translate';

// Brand names and tech terms that should not be translated
const PRESERVE_TERMS = [
  'Costa Blanca Media',
  'Costa Blanca',
  'WordPress',
  'Next.js',
  'React',
  'React Native',
  'Supabase',
  'SEO',
  'Google',
  'Facebook',
  'LinkedIn',
  'Instagram',
  'Twitter',
  'Torrevieja',
  'Torrevieja Rentals',
  'Sihanoukville',
  'QuoteMe',
  'Phnom Penh Real Estate',
  'Lotta Spjut',
  'Nordic Table Tennis',
  'Caramelos Café',
  'Caramelos Cafe',
  'TorreviejaPlus',
  'Torrevieja Plus',
  'Mapbox',
  'DeepL',
  'PPC',
  'ROI',
  'SSL',
  'SSD',
  'CDN',
  'Norodom Sihanouk',
];

async function translateTexts(texts: string[]): Promise<string[]> {
  if (texts.length === 0) return [];

  // Batch into chunks of 50 to avoid API limits
  const results: string[] = [];
  for (let i = 0; i < texts.length; i += 50) {
    const batch = texts.slice(i, i + 50);

    const body = new URLSearchParams();
    body.append('source_lang', 'EN');
    body.append('target_lang', 'SV');
    for (const text of batch) {
      body.append('text', text);
    }

    const res = await fetch(DEEPL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
      },
      body: body.toString(),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`DeepL API error ${res.status}: ${errText}`);
    }

    const data = await res.json();
    for (const t of data.translations) {
      results.push(t.text);
    }

    // Small delay between batches
    if (i + 50 < texts.length) {
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  return results;
}

// Flatten a nested object into dot-path keys
function flattenObject(obj: Record<string, unknown>, prefix = ''): Map<string, { value: string; path: string }> {
  const result = new Map<string, { value: string; path: string }>();

  for (const [key, value] of Object.entries(obj)) {
    const currentPath = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      result.set(currentPath, { value, path: currentPath });
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === 'string') {
          result.set(`${currentPath}[${index}]`, { value: item, path: `${currentPath}[${index}]` });
        } else if (typeof item === 'object' && item !== null) {
          const nested = flattenObject(item as Record<string, unknown>, `${currentPath}[${index}]`);
          for (const [k, v] of nested) {
            result.set(k, v);
          }
        }
      });
    } else if (typeof value === 'object' && value !== null) {
      const nested = flattenObject(value as Record<string, unknown>, currentPath);
      for (const [k, v] of nested) {
        result.set(k, v);
      }
    }
  }

  return result;
}

// Set a value in a nested object using dot.path[index] notation
function setNestedValue(obj: Record<string, unknown>, pathStr: string, value: string): void {
  const parts = pathStr.split(/\.(?![^\[]*\])/);
  let current: Record<string, unknown> = obj;

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    const arrayMatch = part.match(/^(.+?)\[(\d+)\](.*)$/);

    if (arrayMatch) {
      const [, arrKey, indexStr, rest] = arrayMatch;
      if (!current[arrKey]) current[arrKey] = [];
      const arr = current[arrKey] as unknown[];
      const idx = parseInt(indexStr);
      if (rest) {
        // Nested inside array element
        if (!arr[idx]) arr[idx] = {};
        current = arr[idx] as Record<string, unknown>;
        if (rest.startsWith('.')) {
          const remainingPath = parts.slice(i + 1).join('.');
          setNestedValue(current, `${rest.slice(1)}.${remainingPath}`, value);
          return;
        }
      } else {
        if (!arr[idx]) arr[idx] = {};
        current = arr[idx] as Record<string, unknown>;
      }
    } else {
      if (!current[part]) current[part] = {};
      current = current[part] as Record<string, unknown>;
    }
  }

  const lastPart = parts[parts.length - 1];
  const lastArrayMatch = lastPart.match(/^(.+?)\[(\d+)\]$/);

  if (lastArrayMatch) {
    const [, arrKey, indexStr] = lastArrayMatch;
    if (!current[arrKey]) current[arrKey] = [];
    (current[arrKey] as unknown[])[parseInt(indexStr)] = value;
  } else {
    current[lastPart] = value;
  }
}

async function translateDictionary() {
  console.log('📖 Reading en.json...');
  const enPath = path.join(__dirname, '../src/lib/i18n/dictionaries/en.json');
  const enDict = JSON.parse(fs.readFileSync(enPath, 'utf-8'));

  // Flatten all strings
  const flatStrings = flattenObject(enDict);
  const paths: string[] = [];
  const values: string[] = [];

  for (const [p, entry] of flatStrings) {
    paths.push(p);
    values.push(entry.value);
  }

  console.log(`🔤 Translating ${values.length} strings...`);
  const translated = await translateTexts(values);

  // Build Swedish dictionary
  const svDict: Record<string, unknown> = {};

  // First deep clone the structure
  const cloned = JSON.parse(JSON.stringify(enDict));

  for (let i = 0; i < paths.length; i++) {
    setNestedValue(cloned, paths[i], translated[i]);
  }

  const svPath = path.join(__dirname, '../src/lib/i18n/dictionaries/sv.json');
  fs.writeFileSync(svPath, JSON.stringify(cloned, null, 2), 'utf-8');
  console.log('✅ sv.json written!');
}

// Translate blog content line, preserving prefixes
function translateBlogContentLine(line: string): { textToTranslate: string; prefix: string; isBullet: boolean } {
  const prefixes = ['HEADING:', 'BULLET:', 'QUOTE:', 'IMAGE:', 'IMAGERIGHT:'];

  for (const prefix of prefixes) {
    if (line.startsWith(prefix)) {
      if (prefix === 'IMAGE:' || prefix === 'IMAGERIGHT:') {
        return { textToTranslate: '', prefix: line, isBullet: false };
      }
      return {
        textToTranslate: line.slice(prefix.length),
        prefix,
        isBullet: prefix === 'BULLET:' || prefix === 'QUOTE:',
      };
    }
  }

  return { textToTranslate: line, prefix: '', isBullet: false };
}

async function translateDataFiles() {
  const srcDir = path.join(__dirname, '../src/lib/data');

  // --- Translate services ---
  console.log('🔧 Translating services...');
  // Parse the TS data files

  // Extract all translatable strings from services
  const services = await loadServicesData();
  const serviceTexts: string[] = [];
  const serviceTextMap: { serviceIdx: number; field: string; subIdx?: number }[] = [];

  for (let i = 0; i < services.length; i++) {
    const s = services[i];
    serviceTexts.push(s.name);
    serviceTextMap.push({ serviceIdx: i, field: 'name' });
    serviceTexts.push(s.shortDescription);
    serviceTextMap.push({ serviceIdx: i, field: 'shortDescription' });
    serviceTexts.push(s.metaDescription);
    serviceTextMap.push({ serviceIdx: i, field: 'metaDescription' });
    for (let j = 0; j < s.description.length; j++) {
      serviceTexts.push(s.description[j]);
      serviceTextMap.push({ serviceIdx: i, field: 'description', subIdx: j });
    }
    for (let j = 0; j < s.benefits.length; j++) {
      serviceTexts.push(s.benefits[j]);
      serviceTextMap.push({ serviceIdx: i, field: 'benefits', subIdx: j });
    }
  }

  const translatedServiceTexts = await translateTexts(serviceTexts);

  // Build translated services
  const svServices = JSON.parse(JSON.stringify(services));
  for (let k = 0; k < serviceTextMap.length; k++) {
    const map = serviceTextMap[k];
    const s = svServices[map.serviceIdx];
    if (map.field === 'description' && map.subIdx !== undefined) {
      s.description[map.subIdx] = translatedServiceTexts[k];
    } else if (map.field === 'benefits' && map.subIdx !== undefined) {
      s.benefits[map.subIdx] = translatedServiceTexts[k];
    } else {
      s[map.field] = translatedServiceTexts[k];
    }
  }

  writeDataFile(path.join(srcDir, 'services.sv.ts'), 'Service', 'services', svServices, `import type { Service } from './services';`);
  console.log('✅ services.sv.ts written!');

  // --- Translate blog posts ---
  console.log('📝 Translating blog posts...');
  const blogPosts = await loadBlogPostsData();
  const blogTexts: string[] = [];
  const blogTextMap: { postIdx: number; field: string; subIdx?: number; bulletParts?: number }[] = [];

  for (let i = 0; i < blogPosts.length; i++) {
    const p = blogPosts[i];
    blogTexts.push(p.title);
    blogTextMap.push({ postIdx: i, field: 'title' });
    blogTexts.push(p.excerpt);
    blogTextMap.push({ postIdx: i, field: 'excerpt' });

    for (let j = 0; j < p.content.length; j++) {
      const line = p.content[j];
      const { textToTranslate, prefix, isBullet } = translateBlogContentLine(line);

      if (!textToTranslate) {
        // IMAGE lines - skip
        continue;
      }

      if (prefix === 'BULLET:') {
        // Split by | and translate each part
        const parts = textToTranslate.split('|');
        for (let k = 0; k < parts.length; k++) {
          blogTexts.push(parts[k]);
          blogTextMap.push({ postIdx: i, field: 'content', subIdx: j, bulletParts: k });
        }
      } else if (prefix === 'QUOTE:') {
        const parts = textToTranslate.split('|');
        for (let k = 0; k < parts.length; k++) {
          blogTexts.push(parts[k]);
          blogTextMap.push({ postIdx: i, field: 'content_quote', subIdx: j, bulletParts: k });
        }
      } else {
        blogTexts.push(textToTranslate);
        blogTextMap.push({ postIdx: i, field: prefix ? `content_heading` : 'content', subIdx: j });
      }
    }
  }

  const translatedBlogTexts = await translateTexts(blogTexts);

  // Build translated blog posts
  const svBlogPosts = JSON.parse(JSON.stringify(blogPosts));
  // We need to reconstruct the content lines
  // First set simple fields
  const bulletAccum: Map<string, string[]> = new Map();
  const quoteAccum: Map<string, string[]> = new Map();

  for (let k = 0; k < blogTextMap.length; k++) {
    const map = blogTextMap[k];
    const p = svBlogPosts[map.postIdx];

    if (map.field === 'title') {
      p.title = translatedBlogTexts[k];
    } else if (map.field === 'excerpt') {
      p.excerpt = translatedBlogTexts[k];
    } else if (map.field === 'content_heading') {
      const original = blogPosts[map.postIdx].content[map.subIdx!];
      const prefix = original.split(':')[0] + ':';
      p.content[map.subIdx!] = prefix + translatedBlogTexts[k];
    } else if (map.field === 'content' && map.bulletParts !== undefined) {
      const key = `${map.postIdx}_${map.subIdx}`;
      if (!bulletAccum.has(key)) bulletAccum.set(key, []);
      bulletAccum.get(key)![map.bulletParts] = translatedBlogTexts[k];
    } else if (map.field === 'content_quote') {
      const key = `${map.postIdx}_${map.subIdx}`;
      if (!quoteAccum.has(key)) quoteAccum.set(key, []);
      quoteAccum.get(key)![map.bulletParts!] = translatedBlogTexts[k];
    } else if (map.field === 'content') {
      p.content[map.subIdx!] = translatedBlogTexts[k];
    }
  }

  // Apply accumulated bullet/quote translations
  for (const [key, parts] of bulletAccum) {
    const [postIdx, subIdx] = key.split('_').map(Number);
    svBlogPosts[postIdx].content[subIdx] = 'BULLET:' + parts.join('|');
  }
  for (const [key, parts] of quoteAccum) {
    const [postIdx, subIdx] = key.split('_').map(Number);
    svBlogPosts[postIdx].content[subIdx] = 'QUOTE:' + parts.join('|');
  }

  writeDataFile(path.join(srcDir, 'blog-posts.sv.ts'), 'BlogPost', 'blogPosts', svBlogPosts, `import type { BlogPost } from './blog-posts';`);
  console.log('✅ blog-posts.sv.ts written!');

  // --- Translate projects ---
  console.log('🏗️ Translating projects...');
  const projectsData = await loadProjectsData();
  const projectTexts: string[] = [];
  const projectTextMap: { projectIdx: number; field: string; subIdx?: number }[] = [];

  for (let i = 0; i < projectsData.length; i++) {
    const p = projectsData[i];
    // name is usually a brand name, keep it
    if (p.h1Title) {
      projectTexts.push(p.h1Title);
      projectTextMap.push({ projectIdx: i, field: 'h1Title' });
    }
    if (p.h2Subtitle) {
      projectTexts.push(p.h2Subtitle);
      projectTextMap.push({ projectIdx: i, field: 'h2Subtitle' });
    }
    projectTexts.push(p.description);
    projectTextMap.push({ projectIdx: i, field: 'description' });
    if (p.longDescription) {
      for (let j = 0; j < p.longDescription.length; j++) {
        projectTexts.push(p.longDescription[j]);
        projectTextMap.push({ projectIdx: i, field: 'longDescription', subIdx: j });
      }
    }
    if (p.quote) {
      projectTexts.push(p.quote);
      projectTextMap.push({ projectIdx: i, field: 'quote' });
    }
    if (p.category) {
      projectTexts.push(p.category);
      projectTextMap.push({ projectIdx: i, field: 'category' });
    }
    if (p.timeframe) {
      projectTexts.push(p.timeframe);
      projectTextMap.push({ projectIdx: i, field: 'timeframe' });
    }
  }

  const translatedProjectTexts = await translateTexts(projectTexts);

  const svProjects = JSON.parse(JSON.stringify(projectsData));
  for (let k = 0; k < projectTextMap.length; k++) {
    const map = projectTextMap[k];
    const p = svProjects[map.projectIdx];
    if (map.field === 'longDescription' && map.subIdx !== undefined) {
      p.longDescription[map.subIdx] = translatedProjectTexts[k];
    } else {
      p[map.field] = translatedProjectTexts[k];
    }
  }

  writeDataFile(path.join(srcDir, 'projects.sv.ts'), 'Project', 'projects', svProjects, `import type { Project } from './projects';`);
  console.log('✅ projects.sv.ts written!');
}

function writeDataFile(filePath: string, typeName: string, exportName: string, data: unknown[], importLine: string) {
  const content = `${importLine}\n\nexport const ${exportName}: ${typeName}[] = ${JSON.stringify(data, null, 2)};\n`;
  fs.writeFileSync(filePath, content, 'utf-8');
}

// Simple parsers to load data from TS files
async function loadServicesData() {
  const filePath = path.join(__dirname, '../src/lib/data/services.ts');
  const content = fs.readFileSync(filePath, 'utf-8');
  // Extract the array between the first [ and the matching ]
  const match = content.match(/export const services:\s*Service\[\]\s*=\s*(\[[\s\S]*?\]);\s*\n\nexport/);
  if (!match) {
    // Try alternate extraction
    const start = content.indexOf('export const services');
    const arrayStart = content.indexOf('[', start);
    const funcStart = content.indexOf('export function', arrayStart);
    const arrayContent = content.slice(arrayStart, funcStart).trim().replace(/;\s*$/, '');
    // Use eval with Function constructor (safe in build script)
    const fn = new Function(`return ${arrayContent}`);
    return fn() as Array<{
      number: string; slug: string; name: string; shortDescription: string;
      metaDescription: string; description: string[]; benefits: string[];
      icon: string; image: string;
    }>;
  }
  const fn = new Function(`return ${match[1]}`);
  return fn();
}

async function loadBlogPostsData() {
  const filePath = path.join(__dirname, '../src/lib/data/blog-posts.ts');
  const content = fs.readFileSync(filePath, 'utf-8');
  const start = content.indexOf('export const blogPosts');
  const arrayStart = content.indexOf('[', start);
  const funcStart = content.indexOf('export function', arrayStart);
  const arrayContent = content.slice(arrayStart, funcStart).trim().replace(/;\s*$/, '');
  const fn = new Function(`return ${arrayContent}`);
  return fn() as Array<{
    slug: string; title: string; date: string; excerpt: string;
    content: string[]; image: string; categories?: string[]; tags?: string[];
  }>;
}

async function loadProjectsData() {
  const filePath = path.join(__dirname, '../src/lib/data/projects.ts');
  const content = fs.readFileSync(filePath, 'utf-8');
  const start = content.indexOf('export const projects');
  const arrayStart = content.indexOf('[', start);
  const funcStart = content.indexOf('export function', arrayStart);
  const arrayContent = content.slice(arrayStart, funcStart).trim().replace(/;\s*$/, '');
  const fn = new Function(`return ${arrayContent}`);
  return fn() as Array<{
    slug: string; name: string; services: string[]; image: string;
    heroImage?: string; url?: string; description: string;
    longDescription?: string[]; client?: string; category?: string;
    timeframe?: string; quote?: string; quoteImage?: string;
    imageScale?: number; h1Title?: string; h2Subtitle?: string;
  }>;
}

async function main() {
  console.log('🌍 Starting translation process...\n');

  try {
    await translateDictionary();
    console.log('');
    await translateDataFiles();
    console.log('\n🎉 All translations completed!');
  } catch (error) {
    console.error('❌ Translation failed:', error);
    process.exit(1);
  }
}

main();
