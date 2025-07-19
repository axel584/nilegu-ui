// Types pour l'application d'apprentissage de l'espéranto

export interface Texto {
  id: string;
  titolo: string;
  aŭtoro: string;
  nivelo: string;
  longeco: number; // nombre de mots
  priskribo?: string;
  ŝlosilvortoj: string[];
  audioUrl?: string | null;
  sono?: string | null; // URL du fichier audio MP3
}

export interface TextoDetaloj extends Texto {
  enhavo: string;
  traduko?: string;
  notoj?: string;
  vortaro?: { [key: string]: string };
}

export interface Vorto {
  vorto: string;
  traduko: string;
  tipo: string; // nomo, verbo, adjektivo, etc.
}

export interface Filtroj {
  serĉo: string;
  nivelo: string;
  aŭtoro: string;
  longecoMin: number;
  longecoMax: number;
  ŝlosilvortoj: string[];
}

// Types pour l'API
export interface APITeksto {
  id: string;
  titolo: string;
  auxtoro: string; // L'API utilise 'auxtoro' au lieu de 'aŭtoro'
  fonto: string;
  nivelo: string;
  vortoj: string; // nombre de mots en string
  kolekto: string | null;
  etikedoj: string; // tags séparés par des virgules
}

export interface APIResponse {
  data: Texto[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    count: number;
  };
}

export interface Nivelo {
  kodo: string;
  nomo: string;
  priskribo: string;
} 