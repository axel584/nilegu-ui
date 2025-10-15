import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      common: {
        home: 'Accueil',
        catalog: 'Catalogue',
        beginner: 'Débutant',
        intermediate: 'Intermédiaire',
        advanced: 'Avancé',
        words: 'mots',
        close: 'Fermer',
        cancel: 'Annuler',
        submit: 'Envoyer'
      },
      catalog: {
        title: 'Catalogue',
        breadcrumb: 'Catalogue',
        filters: 'Filtres de recherche',
        search: 'Rechercher par titre, auteur ou mots-clés',
        level: 'Niveau',
        allLevels: 'Tous les niveaux',
        sortBy: 'Trier par',
        newest: 'Plus récents',
        oldest: 'Plus anciens',
        shortest: 'Plus courts',
        longest: 'Plus longs',
        textLength: 'Longueur du texte (en mots)',
        withAudio: 'Uniquement les textes avec audio',
        clearFilters: 'Réinitialiser les filtres',
        noResults: 'Aucun texte trouvé',
        noResultsHint: 'Essayez de modifier vos critères de recherche',
        textsFound: 'texte trouvé',
        textsFound_plural: 'textes trouvés',
        showing: 'Affichage de',
        to: 'à',
        on: 'sur',
        results: 'résultats',
        loginRequired: 'Vous devez être connecté pour sauvegarder un texte',
        textSaved: 'Texte sauvegardé avec succès !',
        saveError: 'Erreur lors de la sauvegarde du texte'
      },
      reader: {
        backToCatalog: 'Retour au catalogue',
        by: 'par',
        listenToText: 'Écouter le texte',
        readBy: 'lu par',
        rewind5: 'Revenir 5 secondes en arrière',
        howToUse: 'Comment utiliser cette page',
        instructions: 'Cliquez sur les mots pour voir leur traduction.',
        instructionsWithAudio: ' Écoutez l\'audio en même temps que vous lisez pour améliorer votre prononciation.',
        tip: 'Conseil',
        translation: 'Traduction',
        translationLabel: 'Traduction :',
        myReview: 'Mon avis sur ce texte :',
        rating: 'Note :',
        commentLabel: 'Votre commentaire (optionnel)',
        commentPlaceholder: 'Partagez votre avis sur ce texte...',
        finishText: 'J\'ai fini ce texte',
        saving: 'Enregistrement...',
        loginToReview: 'Pour évaluer ce texte et laisser un commentaire,',
        loginLink: 'connectez-vous',
        loginWith: 'avec votre compte Ikurso',
        loginTitle: 'Connectez-vous avec votre compte Ikurso',
        username: 'Identifiant',
        password: 'Mot de passe',
        login: 'Se connecter',
        loggingIn: 'Connexion...',
        noAccount: 'Si vous n\'avez pas de compte ou que vous avez oublié votre mot de passe, rendez-vous sur',
        textNotFound: 'Texte non trouvé',
        tips: [
          "Ne traduisez pas systématiquement chaque mot. Essayez de comprendre le sens global d'abord.",
          "Lisez à haute voix pour améliorer votre prononciation et votre fluidité.",
          "Si vous ne comprenez pas un mot, continuez votre lecture. Le contexte vous aidera souvent à en deviner le sens.",
          "Relisez le même texte plusieurs fois. Chaque lecture améliore votre compréhension.",
          "Concentrez-vous sur le plaisir de lire plutôt que sur la perfection grammaticale.",
          "Écoutez l'audio plusieurs fois, même sans regarder le texte, pour habituer votre oreille.",
          "Variez les vitesses de lecture audio pour trouver celle qui vous convient le mieux.",
          "Prenez des pauses régulières. L'apprentissage se fait aussi pendant le repos.",
          "Notez mentalement les mots qui reviennent souvent, ils sont généralement importants.",
          "Ne cherchez pas à tout comprendre à 100%. Même 70% de compréhension est un excellent résultat.",
          "Lisez régulièrement, même 10 minutes par jour, plutôt qu'une longue session occasionnelle.",
          "Choisissez des textes qui vous intéressent vraiment pour maintenir votre motivation.",
          "Essayez de visualiser l'histoire pendant que vous lisez pour mieux mémoriser.",
          "Écoutez le texte en fermant les yeux pour vous concentrer uniquement sur les sons.",
          "Relisez un passage difficile après avoir terminé tout le texte, il sera souvent plus clair.",
          "Connectez-vous avec votre compte Ikurso pour laisser une évaluation et un commentaire sur les textes que vous lisez.",
          "Sauvegardez vos textes préférés dans votre liste personnelle en vous connectant, pour les retrouver facilement plus tard.",
          "N'hésitez pas à contacter l'équipe de Ni legu pour leur proposer des textes à ajouter.",
          "Utilisez les filtres du catalogue pour trier les textes par taille ou par difficulté et trouver celui qui correspond à votre niveau.",
          "Si vous aimez l'enregistrement audio d'un lecteur, tapez son nom dans la recherche pour écouter tous ses textes.",
          "Certains mots ne sont pas dans le dictionnaire, mais vous pouvez certainement comprendre leur sens en les décomposant.",
          "Ne lisez pas une grammaire trop tôt, elle peut être utile pour comprendre certains points, mais commencez d'abord par lire.",
          "Évitez d'apprendre des listes de vocabulaire par cœur. Les mots que vous rencontrez dans les textes se mémoriseront naturellement.",
          "Pas besoin de faire des exercices de grammaire. Votre cerveau assimilera les structures en les rencontrant régulièrement dans les textes.",
          "Ne transformez pas la lecture en exercice scolaire. Le simple fait de lire avec plaisir est le meilleur apprentissage.",
          "Oubliez les flashcards et les listes de mots. Rencontrer le vocabulaire dans son contexte est bien plus efficace.",
          "L'apprentissage par la lecture est naturel : faites confiance à votre cerveau pour acquérir la langue sans effort conscient."
        ]
      },
      home: {
        title: 'Ni legu',
        hero: {
          headline: 'Lire, comprendre, apprendre',
          subtitle: 'Découvrez une langue internationale à travers des histoires captivantes',
          cta: 'Découvrir les textes'
        },
        naturalApproach: {
          title: 'Une approche naturelle',
          subtitle: 'Apprenez l\'espéranto comme vous avez appris votre langue maternelle',
          intuitive: {
            title: 'Apprentissage intuitif',
            p1: 'Plongez-vous dans des histoires en espéranto et laissez votre cerveau comprendre naturellement la structure de la langue. Pas besoin d\'étudier la grammaire de manière traditionnelle.',
            p2: 'Votre esprit est programmé pour apprendre les langues. Il suffit de lui donner le bon environnement.'
          },
          listenRead: {
            title: 'Écoute et lecture',
            p1: 'Chaque texte est accompagné d\'un enregistrement audio pour vous familiariser avec la prononciation et l\'intonation de l\'espéranto.',
            p2: 'Cliquez sur n\'importe quel mot pour voir sa traduction et enrichir progressivement votre vocabulaire.'
          }
        },
        whyWorks: {
          title: 'Pourquoi cette méthode fonctionne',
          progressive: {
            title: 'Textes progressifs',
            description: 'Commencez par des histoires simples et progressez vers des textes plus complexes selon votre niveau.'
          },
          natural: {
            title: 'Progression naturelle',
            description: 'Votre compréhension s\'améliore naturellement à chaque lecture, sans effort conscient.'
          },
          durable: {
            title: 'Mémorisation durable',
            description: 'Les mots appris en contexte sont mieux retenus que ceux mémorisés par cœur.'
          }
        },
        levels: {
          title: 'Des textes pour tous les niveaux',
          beginner: {
            label: 'Débutant',
            description: 'Histoires simples avec vocabulaire de base'
          },
          intermediate: {
            label: 'Intermédiaire',
            description: 'Textes plus longs avec vocabulaire enrichi'
          },
          advanced: {
            label: 'Avancé',
            description: 'Œuvres littéraires et textes complexes'
          }
        },
        cta: {
          title: 'Prêt à commencer votre voyage ?',
          subtitle: 'Rejoignez des milliers d\'apprenants qui ont découvert l\'espéranto de manière naturelle et agréable.',
          button: 'Explorer le catalogue'
        }
      }
    }
  },
  en: {
    translation: {
      common: {
        home: 'Home',
        catalog: 'Catalog',
        beginner: 'Beginner',
        intermediate: 'Intermediate',
        advanced: 'Advanced',
        words: 'words',
        close: 'Close',
        cancel: 'Cancel',
        submit: 'Submit'
      },
      catalog: {
        title: 'Catalog',
        breadcrumb: 'Catalog',
        filters: 'Search filters',
        search: 'Search by title, author or keywords',
        level: 'Level',
        allLevels: 'All levels',
        sortBy: 'Sort by',
        newest: 'Newest',
        oldest: 'Oldest',
        shortest: 'Shortest',
        longest: 'Longest',
        textLength: 'Text length (in words)',
        withAudio: 'Only texts with audio',
        clearFilters: 'Clear filters',
        noResults: 'No texts found',
        noResultsHint: 'Try modifying your search criteria',
        textsFound: 'text found',
        textsFound_plural: 'texts found',
        showing: 'Showing',
        to: 'to',
        on: 'of',
        results: 'results',
        loginRequired: 'You must be logged in to save a text',
        textSaved: 'Text saved successfully!',
        saveError: 'Error saving the text'
      },
      reader: {
        backToCatalog: 'Back to catalog',
        by: 'by',
        listenToText: 'Listen to the text',
        readBy: 'read by',
        rewind5: 'Rewind 5 seconds',
        howToUse: 'How to use this page',
        instructions: 'Click on words to see their translation.',
        instructionsWithAudio: ' Listen to the audio while reading to improve your pronunciation.',
        tip: 'Tip',
        translation: 'Translation',
        translationLabel: 'Translation:',
        myReview: 'My review of this text:',
        rating: 'Rating:',
        commentLabel: 'Your comment (optional)',
        commentPlaceholder: 'Share your thoughts on this text...',
        finishText: 'I finished this text',
        saving: 'Saving...',
        loginToReview: 'To rate this text and leave a comment,',
        loginLink: 'log in',
        loginWith: 'with your Ikurso account',
        loginTitle: 'Log in with your Ikurso account',
        username: 'Username',
        password: 'Password',
        login: 'Log in',
        loggingIn: 'Logging in...',
        noAccount: 'If you don\'t have an account or forgot your password, visit',
        textNotFound: 'Text not found',
        tips: [
          "Don't translate every word systematically. Try to understand the overall meaning first.",
          "Read aloud to improve your pronunciation and fluency.",
          "If you don't understand a word, keep reading. Context will often help you guess its meaning.",
          "Reread the same text multiple times. Each reading improves your understanding.",
          "Focus on the pleasure of reading rather than grammatical perfection.",
          "Listen to the audio multiple times, even without looking at the text, to train your ear.",
          "Vary the audio playback speeds to find the one that suits you best.",
          "Take regular breaks. Learning also happens during rest.",
          "Mentally note words that appear often, they are usually important.",
          "Don't aim for 100% comprehension. Even 70% understanding is an excellent result.",
          "Read regularly, even 10 minutes a day, rather than an occasional long session.",
          "Choose texts that genuinely interest you to maintain your motivation.",
          "Try to visualize the story as you read to better memorize it.",
          "Listen to the text with your eyes closed to focus solely on the sounds.",
          "Reread a difficult passage after finishing the entire text, it will often be clearer.",
          "Log in with your Ikurso account to leave a rating and comment on the texts you read.",
          "Save your favorite texts to your personal list by logging in, to easily find them later.",
          "Don't hesitate to contact the Ni legu team to suggest texts to add.",
          "Use the catalog filters to sort texts by length or difficulty and find one that matches your level.",
          "If you like a reader's audio recording, type their name in the search to listen to all their texts.",
          "Some words aren't in the dictionary, but you can certainly understand their meaning by breaking them down.",
          "Don't read a grammar book too early, it can be useful for understanding certain points, but start by reading first.",
          "Avoid memorizing vocabulary lists by heart. Words you encounter in texts will be memorized naturally.",
          "No need to do grammar exercises. Your brain will assimilate structures by encountering them regularly in texts.",
          "Don't turn reading into a school exercise. Simply reading with pleasure is the best learning.",
          "Forget flashcards and word lists. Encountering vocabulary in context is much more effective.",
          "Learning through reading is natural: trust your brain to acquire the language without conscious effort."
        ]
      },
      home: {
        title: 'Ni legu',
        hero: {
          headline: 'Read, understand, learn',
          subtitle: 'Discover an international language through captivating stories',
          cta: 'Discover the texts'
        },
        naturalApproach: {
          title: 'A natural approach',
          subtitle: 'Learn Esperanto as you learned your native language',
          intuitive: {
            title: 'Intuitive learning',
            p1: 'Immerse yourself in Esperanto stories and let your brain naturally understand the structure of the language. No need to study grammar in a traditional way.',
            p2: 'Your mind is programmed to learn languages. You just need to give it the right environment.'
          },
          listenRead: {
            title: 'Listen and read',
            p1: 'Each text comes with an audio recording to familiarize you with the pronunciation and intonation of Esperanto.',
            p2: 'Click on any word to see its translation and progressively enrich your vocabulary.'
          }
        },
        whyWorks: {
          title: 'Why this method works',
          progressive: {
            title: 'Progressive texts',
            description: 'Start with simple stories and progress to more complex texts according to your level.'
          },
          natural: {
            title: 'Natural progression',
            description: 'Your understanding improves naturally with each reading, without conscious effort.'
          },
          durable: {
            title: 'Lasting memorization',
            description: 'Words learned in context are better retained than those memorized by heart.'
          }
        },
        levels: {
          title: 'Texts for all levels',
          beginner: {
            label: 'Beginner',
            description: 'Simple stories with basic vocabulary'
          },
          intermediate: {
            label: 'Intermediate',
            description: 'Longer texts with enriched vocabulary'
          },
          advanced: {
            label: 'Advanced',
            description: 'Literary works and complex texts'
          }
        },
        cta: {
          title: 'Ready to start your journey?',
          subtitle: 'Join thousands of learners who have discovered Esperanto in a natural and enjoyable way.',
          button: 'Explore the catalog'
        }
      }
    }
  },
  eo: {
    translation: {
      common: {
        home: 'Hejmo',
        catalog: 'Katalogo',
        beginner: 'Komencanto',
        intermediate: 'Meznivela',
        advanced: 'Altnivela',
        words: 'vortoj',
        close: 'Fermi',
        cancel: 'Nuligi',
        submit: 'Sendi'
      },
      catalog: {
        title: 'Katalogo',
        breadcrumb: 'Katalogo',
        filters: 'Serĉ-filtriloj',
        search: 'Serĉi laŭ titolo, aŭtoro aŭ ŝlosilvortoj',
        level: 'Nivelo',
        allLevels: 'Ĉiuj niveloj',
        sortBy: 'Ordigi laŭ',
        newest: 'Plej novaj',
        oldest: 'Plej malnovaj',
        shortest: 'Plej mallongaj',
        longest: 'Plej longaj',
        textLength: 'Longeco de teksto (en vortoj)',
        withAudio: 'Nur tekstoj kun sono',
        clearFilters: 'Restarigi filtrilojn',
        noResults: 'Neniu teksto trovita',
        noResultsHint: 'Provu modifi viajn serĉ-kriteriojn',
        textsFound: 'teksto trovita',
        textsFound_plural: 'tekstoj trovitaj',
        showing: 'Montrado de',
        to: 'ĝis',
        on: 'el',
        results: 'rezultoj',
        loginRequired: 'Vi devas ensaluti por konservi tekston',
        textSaved: 'Teksto sukcese konservita!',
        saveError: 'Eraro konservante la tekston'
      },
      reader: {
        backToCatalog: 'Reen al katalogo',
        by: 'de',
        listenToText: 'Aŭskulti la tekston',
        readBy: 'legita de',
        rewind5: 'Reiri 5 sekundojn malantaŭen',
        howToUse: 'Kiel uzi ĉi tiun paĝon',
        instructions: 'Alklaku vortojn por vidi ilian tradukon.',
        instructionsWithAudio: ' Aŭskultu la sonon dum vi legas por plibonigi vian elparolon.',
        tip: 'Konsilo',
        translation: 'Traduko',
        translationLabel: 'Traduko:',
        myReview: 'Mia opinio pri ĉi tiu teksto:',
        rating: 'Noto:',
        commentLabel: 'Via komento (nedeviga)',
        commentPlaceholder: 'Diskonu vian opinion pri ĉi tiu teksto...',
        finishText: 'Mi finis ĉi tiun tekston',
        saving: 'Konservante...',
        loginToReview: 'Por taksi ĉi tiun tekston kaj lasi komenton,',
        loginLink: 'ensalutu',
        loginWith: 'per via Ikurso-konto',
        loginTitle: 'Ensalutu per via Ikurso-konto',
        username: 'Salutnomo',
        password: 'Pasvorto',
        login: 'Ensaluti',
        loggingIn: 'Ensalutante...',
        noAccount: 'Se vi ne havas konton aŭ forgesis vian pasvorton, vizitu',
        textNotFound: 'Teksto ne trovita',
        tips: [
          "Ne traduku sistemece ĉiun vorton. Provu kompreni la ĝeneralan signifon unue.",
          "Legu laŭtvoĉe por plibonigi vian elparolon kaj fluecon.",
          "Se vi ne komprenas vorton, daŭrigu legi. La kunteksto ofte helpos vin diveni ĝian signifon.",
          "Relegu la saman tekston plurfoje. Ĉiu legado plibonigas vian komprenon.",
          "Koncentriĝu pri la plezuro de legado prefere ol pri gramatika perfekteco.",
          "Aŭskultu la sonregistraĵon plurfoje, eĉ sen rigardi la tekston, por kutimigi vian orelon.",
          "Varii la rapidojn de sona legado por trovi tiun kiu plej konvenas al vi.",
          "Faru regulajn paŭzojn. Lernado okazas ankaŭ dum ripozo.",
          "Notu mense vortojn kiuj ofte aperas, ili estas kutime gravaj.",
          "Ne celu 100% komprenon. Eĉ 70% kompreno estas bonega rezulto.",
          "Legu regule, eĉ 10 minutojn tage, prefere ol okazan longan seancon.",
          "Elektu tekstojn kiuj vere interesas vin por konservi vian motivadon.",
          "Provu bildigi la rakonton dum vi legas por pli bone memorigi.",
          "Aŭskultu la tekston kun fermitaj okuloj por koncentriĝi nur pri la sonoj.",
          "Relegu malfacilan paĝon post fini la tutan tekston, ĝi ofte estos pli klara.",
          "Ensalutu per via Ikurso-konto por lasi takson kaj komenton pri la tekstoj kiujn vi legas.",
          "Konservu viajn plej ŝatatajn tekstojn en via persona listo ensalutante, por facile retrovi ilin poste.",
          "Ne hezitu kontakti la teamon de Ni legu por proponi tekstojn aldonendajn.",
          "Uzu la katalogajn filtrilojn por ordigi tekstojn laŭ grandeco aŭ malfacileco kaj trovi tiun kiu kongruas al via nivelo.",
          "Se vi ŝatas leganton, tajpu lian nomon en la serĉo por aŭskulti ĉiujn liajn tekstojn.",
          "Iuj vortoj ne estas en la vortaro, sed vi certe povas kompreni ilian signifon dismuntante ilin.",
          "Ne legu gramatikon tro frue, ĝi povas esti utila por kompreni certajn punktojn, sed komencu unue per legado.",
          "Evitu lerni vortarojn parkere. Vortoj kiujn vi renkontas en tekstoj memoriĝos nature.",
          "Ne necesas fari gramatikajn ekzercojn. Via cerbo asimilos strukturojn renkontante ilin regule en tekstoj.",
          "Ne transformu legadon en lernejan ekzercon. La simpla legado kun plezuro estas la plej bona lernado.",
          "Forgesu flashcard-ojn kaj vortlistojn. Renkonti vortaron en ĝia kunteksto estas multe pli efika.",
          "Lernado per legado estas natura: fidu vian cerbon por akiri la lingvon sen konscia peno."
        ]
      },
      home: {
        title: 'Ni legu',
        hero: {
          headline: 'Legi, kompreni, lerni',
          subtitle: 'Malkovru internacilingvon per ravaj rakontoj',
          cta: 'Malkovri la tekstojn'
        },
        naturalApproach: {
          title: 'Natura aliro',
          subtitle: 'Lernu Esperanton kiel vi lernis vian denaskan lingvon',
          intuitive: {
            title: 'Intuicia lernado',
            p1: 'Enmetu vin en Esperantajn rakontojn kaj lasu vian cerbon nature kompreni la strukturon de la lingvo. Ne necesas studi gramatikon tradicie.',
            p2: 'Via menso estas programita por lerni lingvojn. Sufiĉas doni al ĝi la ĝustan medion.'
          },
          listenRead: {
            title: 'Aŭskulti kaj legi',
            p1: 'Ĉiu teksto akompanis per sonregistraĵo por familiigi vin kun la prononco kaj intonacio de Esperanto.',
            p2: 'Alklaku ajnan vorton por vidi ĝian tradukon kaj iom post iom riĉigi vian vortprovizon.'
          }
        },
        whyWorks: {
          title: 'Kial ĉi tiu metodo funkcias',
          progressive: {
            title: 'Progresivaj tekstoj',
            description: 'Komencu per simplaj rakontoj kaj progresu al pli kompleksaj tekstoj laŭ via nivelo.'
          },
          natural: {
            title: 'Natura progreso',
            description: 'Via kompreno pliboniĝas nature ĉe ĉiu legado, sen konscia peno.'
          },
          durable: {
            title: 'Daŭra memorado',
            description: 'Vortoj lernitaj en kunteksto estas pli bone retenataj ol tiuj parkere memorigitaj.'
          }
        },
        levels: {
          title: 'Tekstoj por ĉiuj niveloj',
          beginner: {
            label: 'Komencanto',
            description: 'Simplaj rakontoj kun baza vortprovizo'
          },
          intermediate: {
            label: 'Meznivela',
            description: 'Pli longaj tekstoj kun riĉigita vortprovizo'
          },
          advanced: {
            label: 'Altnivela',
            description: 'Literaturaj verkoj kaj kompleksaj tekstoj'
          }
        },
        cta: {
          title: 'Ĉu vi pretas komenci vian vojaĝon?',
          subtitle: 'Aliĝu al miloj da lernantoj kiuj malkovris Esperanton nature kaj agrable.',
          button: 'Esplori la katalogon'
        }
      }
    }
  },
  es: {
    translation: {
      common: {
        home: 'Inicio',
        catalog: 'Catálogo',
        beginner: 'Principiante',
        intermediate: 'Intermedio',
        advanced: 'Avanzado',
        words: 'palabras',
        close: 'Cerrar',
        cancel: 'Cancelar',
        submit: 'Enviar'
      },
      catalog: {
        title: 'Catálogo',
        breadcrumb: 'Catálogo',
        filters: 'Filtros de búsqueda',
        search: 'Buscar por título, autor o palabras clave',
        level: 'Nivel',
        allLevels: 'Todos los niveles',
        sortBy: 'Ordenar por',
        newest: 'Más recientes',
        oldest: 'Más antiguos',
        shortest: 'Más cortos',
        longest: 'Más largos',
        textLength: 'Longitud del texto (en palabras)',
        withAudio: 'Solo textos con audio',
        clearFilters: 'Restablecer filtros',
        noResults: 'No se encontraron textos',
        noResultsHint: 'Intenta modificar tus criterios de búsqueda',
        textsFound: 'texto encontrado',
        textsFound_plural: 'textos encontrados',
        showing: 'Mostrando',
        to: 'a',
        on: 'de',
        results: 'resultados',
        loginRequired: 'Debes iniciar sesión para guardar un texto',
        textSaved: '¡Texto guardado exitosamente!',
        saveError: 'Error al guardar el texto'
      },
      reader: {
        backToCatalog: 'Volver al catálogo',
        by: 'por',
        listenToText: 'Escuchar el texto',
        readBy: 'leído por',
        rewind5: 'Retroceder 5 segundos',
        howToUse: 'Cómo usar esta página',
        instructions: 'Haz clic en las palabras para ver su traducción.',
        instructionsWithAudio: ' Escucha el audio mientras lees para mejorar tu pronunciación.',
        tip: 'Consejo',
        translation: 'Traducción',
        translationLabel: 'Traducción:',
        myReview: 'Mi opinión sobre este texto:',
        rating: 'Calificación:',
        commentLabel: 'Tu comentario (opcional)',
        commentPlaceholder: 'Comparte tu opinión sobre este texto...',
        finishText: 'He terminado este texto',
        saving: 'Guardando...',
        loginToReview: 'Para calificar este texto y dejar un comentario,',
        loginLink: 'inicia sesión',
        loginWith: 'con tu cuenta Ikurso',
        loginTitle: 'Inicia sesión con tu cuenta Ikurso',
        username: 'Usuario',
        password: 'Contraseña',
        login: 'Iniciar sesión',
        loggingIn: 'Iniciando sesión...',
        noAccount: 'Si no tienes cuenta o has olvidado tu contraseña, visita',
        textNotFound: 'Texto no encontrado',
        tips: [
          "No traduzcas sistemáticamente cada palabra. Intenta comprender el significado global primero.",
          "Lee en voz alta para mejorar tu pronunciación y fluidez.",
          "Si no entiendes una palabra, sigue leyendo. El contexto a menudo te ayudará a adivinar su significado.",
          "Vuelve a leer el mismo texto varias veces. Cada lectura mejora tu comprensión.",
          "Concéntrate en el placer de leer en lugar de la perfección gramatical.",
          "Escucha el audio varias veces, incluso sin mirar el texto, para acostumbrar tu oído.",
          "Varía las velocidades de reproducción de audio para encontrar la que mejor te convenga.",
          "Toma descansos regulares. El aprendizaje también ocurre durante el descanso.",
          "Nota mentalmente las palabras que aparecen a menudo, generalmente son importantes.",
          "No busques comprender el 100%. Incluso el 70% de comprensión es un resultado excelente.",
          "Lee regularmente, incluso 10 minutos al día, en lugar de una sesión larga ocasional.",
          "Elige textos que realmente te interesen para mantener tu motivación.",
          "Intenta visualizar la historia mientras lees para memorizar mejor.",
          "Escucha el texto con los ojos cerrados para concentrarte únicamente en los sonidos.",
          "Vuelve a leer un pasaje difícil después de terminar todo el texto, a menudo será más claro."
        ]
      },
      home: {
        title: 'Ni legu',
        hero: {
          headline: 'Leer, comprender, aprender',
          subtitle: 'Descubre un idioma internacional a través de historias cautivadoras',
          cta: 'Descubrir los textos'
        },
        naturalApproach: {
          title: 'Un enfoque natural',
          subtitle: 'Aprende esperanto como aprendiste tu lengua materna',
          intuitive: {
            title: 'Aprendizaje intuitivo',
            p1: 'Sumérgete en historias en esperanto y deja que tu cerebro comprenda naturalmente la estructura del idioma. No necesitas estudiar la gramática de manera tradicional.',
            p2: 'Tu mente está programada para aprender idiomas. Solo necesitas darle el entorno adecuado.'
          },
          listenRead: {
            title: 'Escuchar y leer',
            p1: 'Cada texto viene con una grabación de audio para familiarizarte con la pronunciación y entonación del esperanto.',
            p2: 'Haz clic en cualquier palabra para ver su traducción y enriquecer progresivamente tu vocabulario.'
          }
        },
        whyWorks: {
          title: 'Por qué funciona este método',
          progressive: {
            title: 'Textos progresivos',
            description: 'Comienza con historias simples y progresa hacia textos más complejos según tu nivel.'
          },
          natural: {
            title: 'Progresión natural',
            description: 'Tu comprensión mejora naturalmente con cada lectura, sin esfuerzo consciente.'
          },
          durable: {
            title: 'Memorización duradera',
            description: 'Las palabras aprendidas en contexto se retienen mejor que las memorizadas de memoria.'
          }
        },
        levels: {
          title: 'Textos para todos los niveles',
          beginner: {
            label: 'Principiante',
            description: 'Historias simples con vocabulario básico'
          },
          intermediate: {
            label: 'Intermedio',
            description: 'Textos más largos con vocabulario enriquecido'
          },
          advanced: {
            label: 'Avanzado',
            description: 'Obras literarias y textos complejos'
          }
        },
        cta: {
          title: '¿Listo para comenzar tu viaje?',
          subtitle: 'Únete a miles de estudiantes que han descubierto el esperanto de forma natural y agradable.',
          button: 'Explorar el catálogo'
        }
      }
    }
  },
  pt: {
    translation: {
      common: {
        home: 'Início',
        catalog: 'Catálogo',
        beginner: 'Iniciante',
        intermediate: 'Intermediário',
        advanced: 'Avançado',
        words: 'palavras',
        close: 'Fechar',
        cancel: 'Cancelar',
        submit: 'Enviar'
      },
      catalog: {
        title: 'Catálogo',
        breadcrumb: 'Catálogo',
        filters: 'Filtros de pesquisa',
        search: 'Pesquisar por título, autor ou palavras-chave',
        level: 'Nível',
        allLevels: 'Todos os níveis',
        sortBy: 'Ordenar por',
        newest: 'Mais recentes',
        oldest: 'Mais antigos',
        shortest: 'Mais curtos',
        longest: 'Mais longos',
        textLength: 'Comprimento do texto (em palavras)',
        withAudio: 'Apenas textos com áudio',
        clearFilters: 'Limpar filtros',
        noResults: 'Nenhum texto encontrado',
        noResultsHint: 'Tente modificar seus critérios de pesquisa',
        textsFound: 'texto encontrado',
        textsFound_plural: 'textos encontrados',
        showing: 'Mostrando',
        to: 'a',
        on: 'de',
        results: 'resultados',
        loginRequired: 'Você deve estar logado para salvar um texto',
        textSaved: 'Texto salvo com sucesso!',
        saveError: 'Erro ao salvar o texto'
      },
      reader: {
        backToCatalog: 'Voltar ao catálogo',
        by: 'por',
        listenToText: 'Ouvir o texto',
        readBy: 'lido por',
        rewind5: 'Retroceder 5 segundos',
        howToUse: 'Como usar esta página',
        instructions: 'Clique nas palavras para ver sua tradução.',
        instructionsWithAudio: ' Ouça o áudio enquanto lê para melhorar sua pronúncia.',
        tip: 'Dica',
        translation: 'Tradução',
        translationLabel: 'Tradução:',
        myReview: 'Minha opinião sobre este texto:',
        rating: 'Avaliação:',
        commentLabel: 'Seu comentário (opcional)',
        commentPlaceholder: 'Compartilhe sua opinião sobre este texto...',
        finishText: 'Terminei este texto',
        saving: 'Salvando...',
        loginToReview: 'Para avaliar este texto e deixar um comentário,',
        loginLink: 'faça login',
        loginWith: 'com sua conta Ikurso',
        loginTitle: 'Faça login com sua conta Ikurso',
        username: 'Usuário',
        password: 'Senha',
        login: 'Fazer login',
        loggingIn: 'Fazendo login...',
        noAccount: 'Se você não tem uma conta ou esqueceu sua senha, visite',
        textNotFound: 'Texto não encontrado',
        tips: [
          "Não traduza sistematicamente cada palavra. Tente compreender o significado global primeiro.",
          "Leia em voz alta para melhorar sua pronúncia e fluência.",
          "Se não entender uma palavra, continue lendo. O contexto frequentemente ajudará a adivinhar seu significado.",
          "Releia o mesmo texto várias vezes. Cada leitura melhora sua compreensão.",
          "Concentre-se no prazer de ler em vez da perfeição gramatical.",
          "Ouça o áudio várias vezes, mesmo sem olhar o texto, para acostumar seu ouvido.",
          "Varie as velocidades de reprodução de áudio para encontrar a que melhor lhe convém.",
          "Faça pausas regulares. O aprendizado também acontece durante o descanso.",
          "Note mentalmente as palavras que aparecem frequentemente, geralmente são importantes.",
          "Não busque compreender 100%. Mesmo 70% de compreensão é um resultado excelente.",
          "Leia regularmente, mesmo 10 minutos por dia, em vez de uma sessão longa ocasional.",
          "Escolha textos que realmente interessem você para manter sua motivação.",
          "Tente visualizar a história enquanto lê para memorizar melhor.",
          "Ouça o texto com os olhos fechados para se concentrar apenas nos sons.",
          "Releia uma passagem difícil depois de terminar todo o texto, frequentemente ficará mais claro."
        ]
      },
      home: {
        title: 'Ni legu',
        hero: {
          headline: 'Ler, compreender, aprender',
          subtitle: 'Descubra uma língua internacional através de histórias cativantes',
          cta: 'Descobrir os textos'
        },
        naturalApproach: {
          title: 'Uma abordagem natural',
          subtitle: 'Aprenda esperanto como aprendeu sua língua materna',
          intuitive: {
            title: 'Aprendizagem intuitiva',
            p1: 'Mergulhe em histórias em esperanto e deixe seu cérebro compreender naturalmente a estrutura da língua. Não precisa estudar gramática de maneira tradicional.',
            p2: 'Sua mente está programada para aprender línguas. Basta dar-lhe o ambiente certo.'
          },
          listenRead: {
            title: 'Ouvir e ler',
            p1: 'Cada texto vem com uma gravação de áudio para familiarizá-lo com a pronúncia e entonação do esperanto.',
            p2: 'Clique em qualquer palavra para ver sua tradução e enriquecer progressivamente seu vocabulário.'
          }
        },
        whyWorks: {
          title: 'Por que este método funciona',
          progressive: {
            title: 'Textos progressivos',
            description: 'Comece com histórias simples e progrida para textos mais complexos de acordo com seu nível.'
          },
          natural: {
            title: 'Progressão natural',
            description: 'Sua compreensão melhora naturalmente a cada leitura, sem esforço consciente.'
          },
          durable: {
            title: 'Memorização duradoura',
            description: 'Palavras aprendidas em contexto são melhor retidas do que aquelas memorizadas de cor.'
          }
        },
        levels: {
          title: 'Textos para todos os níveis',
          beginner: {
            label: 'Iniciante',
            description: 'Histórias simples com vocabulário básico'
          },
          intermediate: {
            label: 'Intermediário',
            description: 'Textos mais longos com vocabulário enriquecido'
          },
          advanced: {
            label: 'Avançado',
            description: 'Obras literárias e textos complexos'
          }
        },
        cta: {
          title: 'Pronto para começar sua jornada?',
          subtitle: 'Junte-se a milhares de estudantes que descobriram o esperanto de forma natural e agradável.',
          button: 'Explorar o catálogo'
        }
      }
    }
  },
  it: {
    translation: {
      common: {
        home: 'Home',
        catalog: 'Catalogo',
        beginner: 'Principiante',
        intermediate: 'Intermedio',
        advanced: 'Avanzato',
        words: 'parole',
        close: 'Chiudi',
        cancel: 'Annulla',
        submit: 'Invia'
      },
      catalog: {
        title: 'Catalogo',
        breadcrumb: 'Catalogo',
        filters: 'Filtri di ricerca',
        search: 'Cerca per titolo, autore o parole chiave',
        level: 'Livello',
        allLevels: 'Tutti i livelli',
        sortBy: 'Ordina per',
        newest: 'Più recenti',
        oldest: 'Più vecchi',
        shortest: 'Più corti',
        longest: 'Più lunghi',
        textLength: 'Lunghezza del testo (in parole)',
        withAudio: 'Solo testi con audio',
        clearFilters: 'Reimposta filtri',
        noResults: 'Nessun testo trovato',
        noResultsHint: 'Prova a modificare i criteri di ricerca',
        textsFound: 'testo trovato',
        textsFound_plural: 'testi trovati',
        showing: 'Mostrando',
        to: 'a',
        on: 'di',
        results: 'risultati',
        loginRequired: 'Devi essere connesso per salvare un testo',
        textSaved: 'Testo salvato con successo!',
        saveError: 'Errore nel salvare il testo'
      },
      reader: {
        backToCatalog: 'Torna al catalogo',
        by: 'di',
        listenToText: 'Ascolta il testo',
        readBy: 'letto da',
        rewind5: 'Torna indietro di 5 secondi',
        howToUse: 'Come usare questa pagina',
        instructions: 'Clicca sulle parole per vedere la loro traduzione.',
        instructionsWithAudio: ' Ascolta l\'audio mentre leggi per migliorare la tua pronuncia.',
        tip: 'Suggerimento',
        translation: 'Traduzione',
        translationLabel: 'Traduzione:',
        myReview: 'La mia opinione su questo testo:',
        rating: 'Valutazione:',
        commentLabel: 'Il tuo commento (facoltativo)',
        commentPlaceholder: 'Condividi la tua opinione su questo testo...',
        finishText: 'Ho finito questo testo',
        saving: 'Salvataggio...',
        loginToReview: 'Per valutare questo testo e lasciare un commento,',
        loginLink: 'accedi',
        loginWith: 'con il tuo account Ikurso',
        loginTitle: 'Accedi con il tuo account Ikurso',
        username: 'Nome utente',
        password: 'Password',
        login: 'Accedi',
        loggingIn: 'Accesso in corso...',
        noAccount: 'Se non hai un account o hai dimenticato la password, visita',
        textNotFound: 'Testo non trovato',
        tips: [
          "Non tradurre sistematicamente ogni parola. Cerca di capire il significato globale prima.",
          "Leggi ad alta voce per migliorare la tua pronuncia e fluidità.",
          "Se non capisci una parola, continua a leggere. Il contesto ti aiuterà spesso a indovinarne il significato.",
          "Rileggi lo stesso testo più volte. Ogni lettura migliora la tua comprensione.",
          "Concentrati sul piacere di leggere piuttosto che sulla perfezione grammaticale.",
          "Ascolta l'audio più volte, anche senza guardare il testo, per abituare il tuo orecchio.",
          "Varia le velocità di riproduzione audio per trovare quella che ti si addice meglio.",
          "Fai pause regolari. L'apprendimento avviene anche durante il riposo.",
          "Nota mentalmente le parole che appaiono spesso, di solito sono importanti.",
          "Non cercare di capire il 100%. Anche il 70% di comprensione è un risultato eccellente.",
          "Leggi regolarmente, anche 10 minuti al giorno, piuttosto che una lunga sessione occasionale.",
          "Scegli testi che ti interessano davvero per mantenere la tua motivazione.",
          "Cerca di visualizzare la storia mentre leggi per memorizzare meglio.",
          "Ascolta il testo con gli occhi chiusi per concentrarti solo sui suoni.",
          "Rileggi un passaggio difficile dopo aver finito tutto il testo, sarà spesso più chiaro."
        ]
      },
      home: {
        title: 'Ni legu',
        hero: {
          headline: 'Leggere, comprendere, imparare',
          subtitle: 'Scopri una lingua internazionale attraverso storie avvincenti',
          cta: 'Scoprire i testi'
        },
        naturalApproach: {
          title: 'Un approccio naturale',
          subtitle: 'Impara l\'esperanto come hai imparato la tua lingua madre',
          intuitive: {
            title: 'Apprendimento intuitivo',
            p1: 'Immergiti nelle storie in esperanto e lascia che il tuo cervello comprenda naturalmente la struttura della lingua. Non è necessario studiare la grammatica in modo tradizionale.',
            p2: 'La tua mente è programmata per imparare le lingue. Devi solo darle l\'ambiente giusto.'
          },
          listenRead: {
            title: 'Ascoltare e leggere',
            p1: 'Ogni testo è accompagnato da una registrazione audio per familiarizzare con la pronuncia e l\'intonazione dell\'esperanto.',
            p2: 'Clicca su qualsiasi parola per vedere la sua traduzione e arricchire progressivamente il tuo vocabolario.'
          }
        },
        whyWorks: {
          title: 'Perché questo metodo funziona',
          progressive: {
            title: 'Testi progressivi',
            description: 'Inizia con storie semplici e progredisci verso testi più complessi secondo il tuo livello.'
          },
          natural: {
            title: 'Progressione naturale',
            description: 'La tua comprensione migliora naturalmente ad ogni lettura, senza sforzo cosciente.'
          },
          durable: {
            title: 'Memorizzazione duratura',
            description: 'Le parole apprese in contesto sono meglio trattenute di quelle memorizzate a memoria.'
          }
        },
        levels: {
          title: 'Testi per tutti i livelli',
          beginner: {
            label: 'Principiante',
            description: 'Storie semplici con vocabolario base'
          },
          intermediate: {
            label: 'Intermedio',
            description: 'Testi più lunghi con vocabolario arricchito'
          },
          advanced: {
            label: 'Avanzato',
            description: 'Opere letterarie e testi complessi'
          }
        },
        cta: {
          title: 'Pronto per iniziare il tuo viaggio?',
          subtitle: 'Unisciti a migliaia di studenti che hanno scoperto l\'esperanto in modo naturale e piacevole.',
          button: 'Esplorare il catalogo'
        }
      }
    }
  },
  de: {
    translation: {
      common: {
        home: 'Startseite',
        catalog: 'Katalog',
        beginner: 'Anfänger',
        intermediate: 'Mittelstufe',
        advanced: 'Fortgeschritten',
        words: 'Wörter',
        close: 'Schließen',
        cancel: 'Abbrechen',
        submit: 'Senden'
      },
      catalog: {
        title: 'Katalog',
        breadcrumb: 'Katalog',
        filters: 'Suchfilter',
        search: 'Nach Titel, Autor oder Stichwörtern suchen',
        level: 'Niveau',
        allLevels: 'Alle Niveaus',
        sortBy: 'Sortieren nach',
        newest: 'Neueste',
        oldest: 'Älteste',
        shortest: 'Kürzeste',
        longest: 'Längste',
        textLength: 'Textlänge (in Wörtern)',
        withAudio: 'Nur Texte mit Audio',
        clearFilters: 'Filter zurücksetzen',
        noResults: 'Keine Texte gefunden',
        noResultsHint: 'Versuchen Sie, Ihre Suchkriterien zu ändern',
        textsFound: 'Text gefunden',
        textsFound_plural: 'Texte gefunden',
        showing: 'Anzeige',
        to: 'bis',
        on: 'von',
        results: 'Ergebnisse',
        loginRequired: 'Sie müssen angemeldet sein, um einen Text zu speichern',
        textSaved: 'Text erfolgreich gespeichert!',
        saveError: 'Fehler beim Speichern des Textes'
      },
      reader: {
        backToCatalog: 'Zurück zum Katalog',
        by: 'von',
        listenToText: 'Text anhören',
        readBy: 'gelesen von',
        rewind5: '5 Sekunden zurückspulen',
        howToUse: 'So verwenden Sie diese Seite',
        instructions: 'Klicken Sie auf Wörter, um ihre Übersetzung zu sehen.',
        instructionsWithAudio: ' Hören Sie sich das Audio während des Lesens an, um Ihre Aussprache zu verbessern.',
        tip: 'Tipp',
        translation: 'Übersetzung',
        translationLabel: 'Übersetzung:',
        myReview: 'Meine Meinung zu diesem Text:',
        rating: 'Bewertung:',
        commentLabel: 'Ihr Kommentar (optional)',
        commentPlaceholder: 'Teilen Sie Ihre Meinung zu diesem Text...',
        finishText: 'Ich habe diesen Text beendet',
        saving: 'Speichern...',
        loginToReview: 'Um diesen Text zu bewerten und einen Kommentar zu hinterlassen,',
        loginLink: 'melden Sie sich an',
        loginWith: 'mit Ihrem Ikurso-Konto',
        loginTitle: 'Melden Sie sich mit Ihrem Ikurso-Konto an',
        username: 'Benutzername',
        password: 'Passwort',
        login: 'Anmelden',
        loggingIn: 'Anmeldung läuft...',
        noAccount: 'Wenn Sie kein Konto haben oder Ihr Passwort vergessen haben, besuchen Sie',
        textNotFound: 'Text nicht gefunden',
        tips: [
          'Konzentriere dich auf das Verstehen, nicht auf das Auswendiglernen. Lasse die Sprache natürlich in dein Gehirn eindringen.',
          'Höre beim Lesen zu. Die Assoziation von Klang und Text verstärkt das Lernen.',
          'Klicke nur auf Wörter, die du brauchst, um die Geschichte zu verstehen. Es ist in Ordnung, nicht alles zu wissen.',
          'Lese regelmäßig, auch nur 10 Minuten täglich. Konsistenz ist wichtiger als Intensität.',
          'Beginne mit einfachen Texten und erhöhe die Schwierigkeit schrittweise.',
          'Lese laut, um deine Aussprache zu trainieren.',
          'Notiere dir interessante Wörter und deren Kontext.',
          'Vergleiche Esperanto mit anderen Sprachen, die du kennst.',
          'Erwarte keine perfekte Beherrschung. Lernen ist eine Reise, kein Ziel.',
          'Hab Spaß beim Lesen! Wähle Geschichten, die dich interessieren.',
          'Wiederhole Texte, die dir gefallen haben. Wiederholung hilft bei der Verinnerlichung.',
          'Lasse dich nicht von Fehlern entmutigen. Sie sind ein natürlicher Teil des Lernens.',
          'Versuche vorherzusagen, was als Nächstes in der Geschichte passiert.',
          'Versuche, Bilder in deinem Kopf zu erstellen, während du liest.',
          'Teile deine Lieblingstexte mit anderen Lernenden.'
        ]
      },
      home: {
        title: 'Ni legu',
        hero: {
          headline: 'Lesen, verstehen, lernen',
          subtitle: 'Entdecke eine internationale Sprache durch fesselnde Geschichten',
          cta: 'Texte entdecken'
        },
        naturalApproach: {
          title: 'Ein natürlicher Ansatz',
          subtitle: 'Lerne Esperanto wie du deine Muttersprache gelernt hast',
          intuitive: {
            title: 'Intuitives Lernen',
            p1: 'Tauche ein in Esperanto-Geschichten und lass dein Gehirn die Struktur der Sprache auf natürliche Weise verstehen. Du musst die Grammatik nicht auf traditionelle Weise studieren.',
            p2: 'Dein Verstand ist darauf programmiert, Sprachen zu lernen. Du musst ihm nur die richtige Umgebung geben.'
          },
          listenRead: {
            title: 'Hören und lesen',
            p1: 'Jeder Text wird von einer Audioaufnahme begleitet, um dich mit der Aussprache und Betonung des Esperanto vertraut zu machen.',
            p2: 'Klicke auf ein beliebiges Wort, um seine Übersetzung zu sehen und deinen Wortschatz schrittweise zu erweitern.'
          }
        },
        whyWorks: {
          title: 'Warum diese Methode funktioniert',
          progressive: {
            title: 'Progressive Texte',
            description: 'Beginne mit einfachen Geschichten und schreite zu komplexeren Texten entsprechend deinem Niveau fort.'
          },
          natural: {
            title: 'Natürlicher Fortschritt',
            description: 'Dein Verständnis verbessert sich bei jedem Lesen auf natürliche Weise, ohne bewusste Anstrengung.'
          },
          durable: {
            title: 'Dauerhaftes Einprägen',
            description: 'Im Kontext gelernte Wörter werden besser behalten als auswendig gelernte.'
          }
        },
        levels: {
          title: 'Texte für alle Niveaus',
          beginner: {
            label: 'Anfänger',
            description: 'Einfache Geschichten mit Grundwortschatz'
          },
          intermediate: {
            label: 'Mittelstufe',
            description: 'Längere Texte mit erweitertem Wortschatz'
          },
          advanced: {
            label: 'Fortgeschritten',
            description: 'Literarische Werke und komplexe Texte'
          }
        },
        cta: {
          title: 'Bereit, deine Reise zu beginnen?',
          subtitle: 'Schließe dich Tausenden von Lernenden an, die Esperanto auf natürliche und angenehme Weise entdeckt haben.',
          button: 'Katalog erkunden'
        }
      }
    }
  }
};

// Récupérer la langue sauvegardée ou utiliser le français par défaut
const savedLanguage = localStorage.getItem('preferredLanguage') || 'fr';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage, // utiliser la langue sauvegardée
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
