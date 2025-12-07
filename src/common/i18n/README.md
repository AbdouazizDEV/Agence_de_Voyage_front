# 🌍 Système d'Internationalisation (i18n)

Ce projet utilise `react-i18next` pour gérer les traductions multilingues.

## 📁 Structure

```
src/common/i18n/
├── config.ts              # Configuration i18next
├── locales/
│   ├── fr.json            # Traductions françaises
│   └── en.json            # Traductions anglaises
└── README.md              # Ce fichier
```

## 🚀 Utilisation

### Dans un composant React

```tsx
import { useTranslation } from 'react-i18next'

function MyComponent() {
  const { t, i18n } = useTranslation()

  return (
    <div>
      <h1>{t('nav:offers')}</h1>
      <p>{t('common:loading')}</p>
      <button onClick={() => i18n.changeLanguage('en')}>
        Switch to English
      </button>
    </div>
  )
}
```

### Syntaxe des clés de traduction

Les clés utilisent la syntaxe `namespace:key` :

- `nav:offers` → Namespace `nav`, clé `offers`
- `hero:title` → Namespace `hero`, clé `title`
- `pages:offers.title` → Namespace `pages`, clé imbriquée `offers.title`

### Namespaces disponibles

- **`common`** : Traductions communes (loading, error, buttons, etc.)
- **`nav`** : Navigation (menu, liens)
- **`hero`** : Section hero de la page d'accueil
- **`sections`** : Sections de la page d'accueil
- **`pages`** : Contenu spécifique aux pages

## 🔄 Changer la langue

Le sélecteur de langue est disponible dans le Header. La langue choisie est automatiquement sauvegardée dans `localStorage`.

### Programmatiquement

```tsx
import { useTranslation } from 'react-i18next'

function MyComponent() {
  const { i18n } = useTranslation()

  const changeLanguage = (lang: 'fr' | 'en') => {
    i18n.changeLanguage(lang)
  }

  return (
    <button onClick={() => changeLanguage('en')}>
      English
    </button>
  )
}
```

## ➕ Ajouter une nouvelle traduction

1. Ouvrir le fichier JSON correspondant (`fr.json` ou `en.json`)
2. Ajouter la clé dans le namespace approprié
3. Utiliser `t('namespace:key')` dans votre composant

### Exemple

**fr.json** :
```json
{
  "common": {
    "myNewKey": "Ma nouvelle traduction"
  }
}
```

**en.json** :
```json
{
  "common": {
    "myNewKey": "My new translation"
  }
}
```

**Dans le composant** :
```tsx
const { t } = useTranslation()
<p>{t('common:myNewKey')}</p>
```

## 📝 Notes

- La langue par défaut est le **français** (`fr`)
- La langue est détectée automatiquement depuis le navigateur ou `localStorage`
- Les traductions sont chargées de manière synchrone (pas de Suspense nécessaire)

