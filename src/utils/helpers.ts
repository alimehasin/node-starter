import { Request } from 'express';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from './constants';

export function getLocale(req: Request) {
  const localeHeader = req.acceptsLanguages()[0];

  if (SUPPORTED_LOCALES.includes(localeHeader)) {
    return localeHeader;
  }

  return DEFAULT_LOCALE;
}

export function calcPaginationOffset(page: number, size: number) {
  const skip = size * (page - 1);
  const take = size;

  return { skip, take };
}

export function getPaginationInfo(
  totalRows: number,
  query: { page: number; pageSize: number; [key: string]: any }
) {
  const totalPages = Math.ceil(totalRows / query.pageSize);
  const currentPage = query.page;
  const { pageSize } = query;

  return { totalRows, totalPages, currentPage, pageSize };
}
