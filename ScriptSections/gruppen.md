[author:Felix]

// [require:%/css/some_style.css]
// [require:%/js/some_js.js]

# Gruppen
## Gruppen und Untergruppen

Der Begriff einer Gruppe gehört zu den grundlegensten Strukturen der gesamten
Mathematik und spielt eine wichtige Rolle bei der Beschreibung von Symmetrien
in der Natur. Wir erinnern kurz an die

> Defn
Eine *Gruppe* ist ein Paar (G, ◦) bestehend aus einer Menge G und
einer Verknüpfung:
$$
    ◦ : G × G −→ G
$$
sodass gilt:

- Neutrales Element: Es gibt ein e ∈ G mit e ◦ g = g ◦ e = g für alle g ∈ G.
- Assoziativität: Es ist (g ◦ h) ◦ k = g ◦ (h ◦ k) für alle g, h, k ∈ G.
- Inverse: Zu jedem g ∈ G existiert ein g−1 ∈ G mit g ◦ g−1 = g−1 ◦ g = e.

Die Gruppe heißt *kommutativ* oder *abelsch*, wenn a ◦ b = b ◦ a für alle a, b ∈ G ist.

< End Defn

Das neutrale Element einer Gruppe bezeichnet man auch als Einselement und
schreibt e = 1 ∈ G. Für die Verknüpfung werden oft auch andere Symbole benutzt,
je nach Kontext schreibt man statt a ◦ b auch a · b, a • b oder einfach ab. Nur im Fall
abelscher Gruppen wird auch die additive Notation + verwendet, in diesem Fall
wird das neutrale Element mit 0 ∈ G bezeichnet und heißt Nullelement.

> Bsp
    Erinnern wir uns an einige Beispiele aus der linearen Algebra:
    - Die additiven Gruppen (Z, +), (Q, +), (R, +), . . . sind abelsch.
    - Die multiplikativen Gruppen Q× = (Q\{0}, ·), Q×>0 = (Q>0, ·), . . . sind abelsch.
    - Die allgemeine lineare Gruppe GLn(Q) = { A ∈ Matn×n(Q) | det(A) 6 = 0 } mit der Matrizenmultiplikation als Verknüpfung ist für n > 1 nicht abelsch.
    - Die symmetrische Gruppe Sn := { Bijektive Abbildungen σ : {1, . . . , n} → {1, . . . , n} }
< End Bsp