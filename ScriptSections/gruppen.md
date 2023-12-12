[author:Felix]

# Gruppen
## Gruppen und Untergruppen

Der Begriff einer Gruppe gehört zu den grundlegensten Strukturen der gesamten Mathematik und spielt eine wichtige Rolle bei der Beschreibung von Symmetrien in der Natur. Wir erinnern kurz an die

> Defn
Eine *Gruppe* ist ein Paar \( (G, \circ) \) bestehend aus einer Menge \( G \) und einer Verknüpfung:
$$
    \circ : G \times G \rightarrow G
$$
sodass gilt:

- Neutrales Element: Es gibt ein \( e \in G \) mit \( e \circ g = g \circ e = g \) für alle \( g \in G \).
- Assoziativität: Es ist \( (g \circ h) \circ k = g \circ (h \circ k) \) für alle \( g, h, k \in G \).
- Inverse: Zu jedem \( g \in G \) existiert ein \( g^{-1} \in G \) mit \( g \circ g^{-1} = g^{-1} \circ g = e \).

Die Gruppe heißt *kommutativ* oder *abelsch*, wenn \( a \circ b = b \circ a \) für alle \( a, b \in G \) ist.

< End Defn

Das neutrale Element einer Gruppe bezeichnet man auch als Einselement und schreibt \( e = 1 \in G \). Für die Verknüpfung werden oft auch andere Symbole benutzt, je nach Kontext schreibt man statt \( a \circ b \) auch \( a \cdot b \), \( a \bullet b \) oder einfach \( ab \). Nur im Fall abelscher Gruppen wird auch die additive Notation \( + \) verwendet, in diesem Fall wird das neutrale Element mit \( 0 \in G \) bezeichnet und heißt Nullelement.

> Bsp
    Erinnern wir uns an einige Beispiele aus der linearen Algebra:
    - Die additiven Gruppen \( (\mathbb{Z}, +) \), \( (\mathbb{Q}, +) \), \( (\mathbb{R}, +) \), . . . sind abelsch.
    - Die multiplikativen Gruppen \( \mathbb{Q}^\times = (\mathbb{Q}\setminus\{0\}, \cdot) \), \( \mathbb{Q}^\times_{>0} = (\mathbb{Q}_{>0}, \cdot) \), . . . sind abelsch.
    - Die allgemeine lineare Gruppe 
    $$ 
        \text{GL}_n(\mathbb{Q}) = \{ A \in \text{Mat}_{n \times n}(\mathbb{Q}) | \det(A) \neq 0 \} 
    $$ 
    mit der Matrizenmultiplikation als Verknüpfung ist für \( n > 1 \) nicht abelsch.
    - Die symmetrische Gruppe \( S_n := \{ \text{Bijektive Abbildungen } \sigma : \{1, \ldots, n\} \rightarrow \{1, \ldots, n\} \} \)
< End Bsp

```js
    const id = get_uid();
    document.write(`<div id="${ id }" class="hoi"></div>`);

    const el = document.getElementById(id);
    
    const child = document.createElement('span');
    child.textContent = 'Click me!';
    el.appendChild(child);

    el.addEventListener("click", () => { 
        console.log("Element clicked!");
    });
```

```css
    .hoi{
        border-radius: .5rem;
        margin-top: 2rem;
        background-color: var(--hightlight_color_1);
        padding: .4rem 1rem;
        cursor: pointer;
        color: white;
        width: min-content;
        white-space: nowrap;
    }
```