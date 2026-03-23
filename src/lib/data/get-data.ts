import type { Locale } from '@/lib/i18n/config';
import { services as servicesEn } from './services';
import { services as servicesSv } from './services.sv';
import { blogPosts as blogPostsEn } from './blog-posts';
import { blogPosts as blogPostsSv } from './blog-posts.sv';
import { projects as projectsEn } from './projects';
import { projects as projectsSv } from './projects.sv';

export function getServices(locale: Locale) {
  return locale === 'sv' ? servicesSv : servicesEn;
}

export function getServiceBySlug(slug: string, locale: Locale) {
  const data = getServices(locale);
  return data.find((s) => s.slug === slug);
}

export function getBlogPosts(locale: Locale) {
  return locale === 'sv' ? blogPostsSv : blogPostsEn;
}

export function getBlogPostBySlug(slug: string, locale: Locale) {
  const data = getBlogPosts(locale);
  return data.find((p) => p.slug === slug);
}

export function getProjects(locale: Locale) {
  return locale === 'sv' ? projectsSv : projectsEn;
}

export function getProjectBySlug(slug: string, locale: Locale) {
  const data = getProjects(locale);
  return data.find((p) => p.slug === slug);
}
