# Byg en Quiz-App med Next.js, Tailwind og Open Trivia API

## Formål
Du skal bygge en interaktiv quiz-applikation, hvor brugeren kan vælge kategori og sværhedsgrad, og derefter besvare spørgsmål hentet fra Open Trivia Database API.

## Teknologier
- Next.js (React-baseret framework)
- Tailwind CSS (til styling)
- Open Trivia Database API (https://opentdb.com/api_config.php)

## Krav til funktionalitet

1. **Startside**
   - Velkomstbesked og kort introduktion til quizzen.
   - Mulighed for at vælge:
     - Kategori (f.eks. sport, historie, film)
     - Sværhedsgrad (easy, medium, hard)
     - Antal spørgsmål

2. **Quiz-side**
   - Hent spørgsmål fra Open Trivia API baseret på brugerens valg.
   - Vis ét spørgsmål ad gangen med 4 svarmuligheder.
   - Brugeren kan vælge et svar og gå videre til næste spørgsmål.

3. **Resultatside**
   - Vis antal rigtige svar.
   - Mulighed for at starte en ny quiz.

## Designkrav
- Brug Tailwind til at lave et simpelt, responsivt og brugervenligt design.
- Brug farver og ikoner til at gøre quizzen mere engagerende.
- Giv visuel feedback på rigtige og forkerte svar.



## API Info
Eksempel på API-kald:
https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple

## Vurderingskriterier
- Funktionalitet: Opfylder appen kravene?
- Kodekvalitet: Er koden struktureret og forståelig?
- Design: Er brugeroplevelsen god og layoutet pænt?
- Brug af API: Hentes og vises data korrekt?
