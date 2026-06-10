export const UNCATEGORIZED_CATEGORY = '__uncategorized__';

export type CatalogAiSubset = 'compatible' | 'incompatible' | 'unknown';
export type CatalogAiSubsetFilter = 'all' | CatalogAiSubset;
export type CatalogCategoryFilter = 'all' | string;

export type CatalogFilters = {
  category: CatalogCategoryFilter;
  aiSubset: CatalogAiSubsetFilter;
};

export type CatalogExample = {
  id: string;
  title: string;
  category?: string;
  tags: string[];
  aiSubset: CatalogAiSubset;
};

export type CatalogOption = {
  value: string;
  label: string;
};

export const CATALOG_AI_SUBSET_OPTIONS: CatalogOption[] = [
  { value: 'all', label: 'All subset statuses' },
  { value: 'compatible', label: 'AI compatible' },
  { value: 'incompatible', label: 'AI incompatible' },
  { value: 'unknown', label: 'Unknown or unmarked' }
];

export function catalogAiSubsetValue(value?: string): CatalogAiSubset {
  if (value === 'compatible' || value === 'incompatible' || value === 'unknown') {
    return value;
  }
  return 'unknown';
}

export function catalogAiSubsetLabel(value: CatalogAiSubsetFilter): string {
  return CATALOG_AI_SUBSET_OPTIONS.find((option) => option.value === value)?.label ?? 'Unknown or unmarked';
}

export function catalogCategoryValue(example: { category?: string }): string {
  return example.category?.trim() || UNCATEGORIZED_CATEGORY;
}

export function catalogCategoryLabel(value: string): string {
  if (value === 'all') {
    return 'All categories';
  }
  if (value === UNCATEGORIZED_CATEGORY) {
    return 'Uncategorized';
  }
  return value
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function catalogCategoryOptions(examples: CatalogExample[]): CatalogOption[] {
  const categories = new Set<string>();
  let hasUncategorized = false;

  for (const example of examples) {
    const category = catalogCategoryValue(example);
    if (category === UNCATEGORIZED_CATEGORY) {
      hasUncategorized = true;
    } else {
      categories.add(category);
    }
  }

  const options = [...categories].sort().map((category) => ({
    value: category,
    label: catalogCategoryLabel(category)
  }));

  if (hasUncategorized) {
    options.push({
      value: UNCATEGORIZED_CATEGORY,
      label: catalogCategoryLabel(UNCATEGORIZED_CATEGORY)
    });
  }

  return [{ value: 'all', label: 'All categories' }, ...options];
}

export function filterCatalogExamples<T extends CatalogExample>(examples: T[], filters: CatalogFilters): T[] {
  return examples.filter((example) => {
    const matchesCategory =
      filters.category === 'all' || catalogCategoryValue(example) === filters.category;
    const matchesSubset =
      filters.aiSubset === 'all' || catalogAiSubsetValue(example.aiSubset) === filters.aiSubset;
    return matchesCategory && matchesSubset;
  });
}

export function visibleCatalogTags(tags: string[]): string[] {
  return tags.slice(0, 3);
}
