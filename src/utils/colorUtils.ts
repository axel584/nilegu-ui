/**
 * Convertit un mot en couleur hexadécimale arc-en-ciel cohérente
 */

export const stringToRainbowColor = (str: string): string => {
  // Fonction de hachage simple pour créer un nombre à partir d'une chaîne
  const hashString = (text: string): number => {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convertir en entier 32 bits
    }
    return Math.abs(hash);
  };

  // Convertir le hash en teinte HSL (0-360 degrés)
  const hash = hashString(str.toLowerCase().trim());
  const hue = hash % 360;
  
  // Saturation élevée (80-90%) pour des couleurs vives
  const saturation = 80 + (hash % 10);
  
  // Luminosité modérée (45-60%) pour une bonne lisibilité
  const lightness = 45 + (hash % 15);
  
  // Convertir HSL en RGB
  const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
    h /= 360;
    s /= 100;
    l /= 100;
    
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    let r, g, b;
    
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  };
  
  const [r, g, b] = hslToRgb(hue, saturation, lightness);
  
  // Convertir en hexadécimal
  const toHex = (n: number): string => n.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/**
 * Obtient une couleur de texte contrastée (noir ou blanc) selon la couleur de fond
 */
export const getContrastTextColor = (backgroundColor: string): string => {
  // Convertir hex en RGB
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculer la luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Retourner noir pour les couleurs claires, blanc pour les couleurs sombres
  return luminance > 0.5 ? '#000000' : '#ffffff';
};