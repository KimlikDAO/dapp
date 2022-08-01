import Cüzdan from "/birim/cüzdan/birim";
import Telefon from "/birim/telefon/birim";
import "/ana/sergi/birim";

Cüzdan.bağlanınca((adres) =>
  Telefon.adresGir(Cüzdan.hızlıArabirimAdı(adres)));
