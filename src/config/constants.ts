// Configuration générale de l'application

export const PAGINATION_CONFIG = {
  // Nombre d'éléments par page dans le catalogue
  ITEMS_PER_PAGE: 9 as number,
  
  // Autres configurations de pagination si nécessaire
  MAX_VISIBLE_PAGES: 10,
  SHOW_FIRST_LAST_BUTTONS: true,
};

// Autres constantes de configuration
export const API_CONFIG = {
  // Timeout par défaut pour les requêtes (en millisecondes)  
  DEFAULT_TIMEOUT: 10000,
  
  // Délai de debounce pour la recherche (en millisecondes)
  SEARCH_DEBOUNCE_DELAY: 300,
} as const;

// Configuration des filtres par défaut
export const DEFAULT_FILTERS = {
  LONGECO_MIN: 200,
  LONGECO_MAX: 4000,
  ORDER: 'ekdato',
  SORT: 'DESC',
} as const;