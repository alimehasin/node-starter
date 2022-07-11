import { Request } from 'express';
import { PaginationQuery } from '../types';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from './constants';

export function getLocale(req: Request) {
  const localeHeader = req.acceptsLanguages()[0];

  if (SUPPORTED_LOCALES.includes(localeHeader)) {
    return localeHeader;
  }

  return DEFAULT_LOCALE;
}

function calcPaginationOffset(page: number, size: number) {
  const skip = size * (page - 1);
  const take = size;

  return { skip, take };
}

function getPaginationInfo(
  totalRows: number,
  query: { page: number; pageSize: number; [key: string]: any }
) {
  const totalPages = Math.ceil(totalRows / query.pageSize);
  const currentPage = query.page;
  const { pageSize } = query;

  return { totalRows, totalPages, currentPage, pageSize };
}

export function getPagination(count: number, query: PaginationQuery) {
  const offset = calcPaginationOffset(query.page, query.pageSize);
  const info = getPaginationInfo(count, query);

  return { offset, info };
}
