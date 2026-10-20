// Name spellings are phonetic display transliterations, not alternative legal names.
// Japanese: japanese-names.info/my-name-in-japanese/first-name/shane/
// Mandarin: dict.eudic.net/dicts/en/Shane; Arabic: nametranslate.com/name/shane
// Greeting text is presentation copy; the first name comes from canonical portfolio content.
export interface Greeting {
  readonly language: string;
  readonly label: string;
  readonly text: string;
  readonly ending?: string;
  readonly localizedName?: string;
  readonly direction?: 'ltr' | 'rtl';
}

export const greetingPrefixes: readonly Greeting[] = [
  { language: 'en', label: 'English', text: "Hello, I'm " },
  { language: 'fr', label: 'French', text: "Bonjour, je m'appelle " },
  { language: 'ro', label: 'Romanian', text: 'Salut, sunt ' },
  { language: 'ru', localizedName: 'Шейн', label: 'Russian', text: 'Привет, я ' },
  { language: 'ar', localizedName: 'شين', direction: 'rtl', label: 'Arabic', text: 'مرحبًا، أنا ' },
  // Mauritian wording reference: https://www.polytranslator.com/how-to-say/my-name-is/mauritian-creole/
  { language: 'mfe', label: 'Mauritian Creole', text: 'Bonzour, mo apel ' },
  { language: 'ja', localizedName: 'シェーン', label: 'Japanese', text: 'こんにちは、', ending: 'です。' },
  { language: 'zh-CN', localizedName: '谢恩', label: 'Mandarin', text: '你好，我是', ending: '。' },
  { language: 'sv', label: 'Swedish', text: 'Hej, jag heter ' },
  // Decorative runic transliteration of modern Norwegian "Hei, jeg heter"; not historical Old Norse.
  { language: 'nb', localizedName: 'ᛋᚺᛖᛁᚾ', label: 'Norwegian (runic style)', text: 'ᚺᛖᛁ, ᛃᛖᚷ ᚺᛖᛏᛖᚱ ' },
  { language: 'pt', label: 'Portuguese', text: 'Olá, eu sou ' },
  { language: 'it', label: 'Italian', text: 'Ciao, sono ' },
  { language: 'de', label: 'German', text: 'Hallo, ich bin ' },
  { language: 'sr', localizedName: 'Шејн', label: 'Serbian', text: 'Здраво, ја сам ' },
  { language: 'hr', label: 'Croatian', text: 'Bok, ja sam ' },
  { language: 'es', label: 'Spanish', text: 'Hola, soy ' },
];

export function formatGreeting(greeting: Greeting, name: string): string {
  const displayName = name === 'Shane' ? greeting.localizedName ?? name : name;
  return greeting.text + displayName + (greeting.ending ?? '.');
}
