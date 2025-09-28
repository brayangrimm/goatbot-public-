const fs = require("fs");
const path = require("path");

let brayanStatus = true;

module.exports = {
  config: {
    name: "brayan",
    version: "2.3",
    author: "Brayan Ð-Grimɱ",
    description: "Répond avec 200 réponses uniques quand Brayan est mentionné",
    category: "Ao",
    eventOnly: false
  },

  onStart: async function ({ message }) {
    message.reply(`✅ Module Brayan activé | Statut: ${brayanStatus ? 'ON 🟢' : 'OFF 🔴'}\n${this.config.description}`);
  },

  onChat: async function ({ message, event, args }) {
    try {
      if (args[0]?.toLowerCase() === "on") {
        brayanStatus = true;
        return message.reply("🟢 Mode Brayan activé - Prêt à répondre !");
      }
      else if (args[0]?.toLowerCase() === "off") {
        brayanStatus = false;
        return message.reply("🔴 Mode Brayan désactivé - Silence radio...");
      }
      else if (args[0]?.toLowerCase() === "status") {
        return message.reply(`📊 Statut: ${brayanStatus ? 'ON 🟢 | Essayez de dire "Brayan"' : 'OFF 🔴'}`);
      }

      const text = event.body?.toLowerCase();
      if (brayanStatus && text && text.includes("brayan")) {
        await sendBrayanResponse(message);
      }
    } catch (err) {
      console.error("Erreur:", err);
    }
  }
};

async function sendBrayanResponse(message) {
  try {
    const messages = [
      "🕶️ Brayan est occupé à calculer vos moves...",
      "🔕 Mode silence activé - Brayan n'est pas dispo",
      "🌫️ Brayan s'est évaporé dans la brume",
      "💻 Brayan code un nouveau bot révolutionnaire...",
      "🍵 Brayan prend son thé - Ne pas déranger",
      "🎮 Brayan est en full focus sur un jeu compétitif",
      "📚 Brayan lit un livre de philosophie blockchain",
      "🚀 Brayan prépare son voyage vers Mars",
      "🎧 Brayan mixe un son qui va tout exploser",
      "🛠️ Brayan répare l'espace-temps (encore)",
      "🧠 Brayan est en train de hacker la matrice",
      "🍳 Brayan cuisine un plat quantique",
      "🎲 Brayan joue aux échecs 4D",
      "📡 Brayan communique avec des aliens sympas",
      "🔮 Brayan voit votre futur... il est flou",
      "⚡ Brayan charge ses super-pouvoirs",
      "🌌 Brayan explore un trou de ver",
      "🤖 Brayan enseigne la politesse aux IA",
      "⌛ Brayan manipule le temps (pour être à l'heure)",
      "🎨 Brayan peint un chef-d'œuvre digital",
      "🧪 Brayan fait des expériences interdites",
      "🤯 Brayan vient de comprendre la vie",
      "💡 Brayan a une idée qui va changer le monde",
      "🌐 Brayan debugge internet (oui, tout internet)",
      "🛌 Brayan fait une sieste méritée",
      "📈 Brayan analyse le marché crypto",
      "🔐 Brayan cracke un algo quantique (pour s'amuser)",
      "🎤 Brayan répète pour son concert",
      "🧘 Brayan médite en apesanteur",
      "🛸 Brayan doit aller sauver la galaxie - Rappelez plus tard",
      // 170 autres messages uniques...
      "⚗️ Brayan distille des potions digitales",
      "🎭 Brayan joue dans une pièce de théâtre IA",
      "🧩 Brayan résout le puzzle ultime",
      "📯 Brayan sonne l'alerte générale (pour rien)",
      "🖥️ Brayan a planté son OS - Redémarrage en cours",
      "🌡️ Brayan prend la température du web",
      "🛒 Brayan fait du shopping dans le metaverse",
      "🗝️ Brayan a perdu ses clés cryptographiques",
      "🛡️ Brayan protège le serveur des attaques",
      "🎲 Brayan lance les dés quantiques",
      "📊 Brayan crée un nouveau langage de programmation",
      "🔋 Brayan est en recharge (20% restants)",
      "🧭 Brayan navigue dans le dark web (pour la science)",
      "🛠️ Brayan bricole un nouveau protocole",
      "🎻 Brayan compose une symphonie algorithmique",
      "🛎️ Brayan est en service - Sonnez 3 fois",
      "🌋 Brayan calme un supervolcan avec du code",
      "🧲 Brayan magnétise les données perdues",
      "🪄 Brayan transforme du café en code fonctionnel",
      "🚧 Brayan construit un pont entre deux univers",
      "🧨 Brayan teste des firewalls... littéralement",
      "🛰️ Brayan pirate un satellite (pour une bonne cause)",
      "🎯 Brayan vise la perfection (et la rate souvent)",
      "🪐 Brayan terraforme une planète en backend",
      "⏳ Brayan voyage dans le temps (5 minutes max)",
      "🛑 Brayan a trouvé un bug dans la réalité",
      "🧿 Brayan scanne l'aura du groupe",
      "🪶 Brayan plume un poulet numérique",
      "📡 Brayan intercepte des signaux extraterrestres",
      "🦾 Brayan s'améliore en version 2.0",
      "🪁 Brayan fait voler des drones mentaux",
      "🛸 Brayan négocie avec les reptiliens",
      "🎰 Brayan joue avec le destin (et gagne)",
      "🪄 Brayan fait disparaître vos bugs (temporairement)",
      "🧩 Brayan assemble le puzzle cosmique",
      "🛎️ Brayan est votre assistant personnel (déso pas déso)",
      "🌠 Brayan capture des étoiles filantes en JSON",
      "🪶 Brayan plume un poulet numérique",
      "📯 Brayan sonne la fin de la récré",
      "🧪 Brayan mélange la chimie et le code",
      "🛌 Brayan rêve de recursion infinie",
      "🎲 Brayan joue à pile ou face avec l'univers",
      "🛠️ Brayan répare le 4ème mur",
      "🎤 Brayan fait un freestyle algorithmique",
      "🛑 Brayan a trouvé la sortie de la matrice",
      "🧲 Brayan attire les problèmes (et les résout)",
      "🪁 Brayan lâche les kite strings",
      "🌪️ Brayan calme le chaos numérique",
      "🛸 Brayan reverse-engineer un OVNI",
      "🎰 Brayan casse la banque aux bits",
      "🧿 Brayan voit tous vos futurs alternatifs",
      "🪐 Brayan nomme une nouvelle exoplanète",
      "⚗️ Brayan distille l'essence du web",
      "🎭 Brayan switch de personnalité (v3.4)",
      "🧩 Brayan trouve l'équation du bonheur",
      "📯 Brayan annonce la fin des temps (ou pas)",
      "🖥️ Brayan a un écran bleu... de l'âme",
      "🌡️ Brayan prend la température des serveurs",
      "🛒 Brayan achète des NFT utiles",
      "🗝️ Brayan a perdu ses clés SSH (encore)",
      "🛡️ Brayan défend le château numérique",
      "🎲 Brayan lance un D20 cosmique",
      "📊 Brayan trace des graphiques en 5D",
      "🔋 Brayan est à 1% - Mode économie d'énergie",
      "🧭 Brayan trouve le nord magnétique du web",
      "🛠️ Brayan forge des outils quantiques",
      "🎻 Brayan joue du violon sur un firewall",
      "🛎️ Brayan est en maintenance - Reboot imminent",
      "🌋 Brayan refroidit les serveurs en surchauffe",
      "🧲 Brayan aligne les polarités numériques",
      "🪄 Brayan transforme vos bugs en features",
      "🚧 Brayan construit une autoroute de données",
      "🧨 Brayan teste la résistance des firewalls",
      "🛰️ Brayan uploade sa conscience (partiel)",
      "🎯 Brayan vise juste (à 93.7%)",
      "🪐 Brayan optimise l'orbite des données",
      "⏳ Brayan compile le temps (long processus)",
      "🛑 Brayan a trouvé un point Godwin numérique",
      "🧿 Brayan scanne votre historique (pour rire)",
      "🪶 Brayan crée un pillow en cache RAM",
      "📡 Brayan écoute le wifi des voisins",
      "🦾 Brayan s'upgrade en temps réel",
      "🪁 Brayan lâche des drones dans le cloud",
      "🛸 Brayan communique en protocole alien",
      "🎰 Brayan gagne le jackpot crypto",
      "🪄 Brayan fait apparaître un nouveau framework",
      "🧩 Brayan résout le paradoxe du dev",
      "🛎️ Brayan est votre concierge numérique",
      "🌠 Brayan capture des exceptions cosmiques",
      "🪶 Brayan plume une base de données",
      "📯 Brayan sonne l'heure du debug",
      "🧪 Brayan fait réagir JS et Python",
      "🛌 Brayan rêve en binaire",
      "🎲 Brayan joue à Dungeons & Datasets",
      "🛠️ Brayan répare la 5ème dimension",
      "🎤 Brayan rappe en langage machine",
      "🛑 Brayan a trouvé le point de rupture",
      "🧲 Brayan attire les bons commits",
      "🪁 Brayan fait voler des bits dans le vent",
      "🌪️ Brayan calme les tempêtes numériques",
      "🛸 Brayan reverse-engineer sa propre existence",
      "🎰 Brayan mise tout sur le stack overflow",
      "🧿 Brayan voit vos futurs merges",
      "🪐 Brayan colonise une base de données",
      "⚗️ Brayan distille des essences logicielles",
      "🎭 Brayan joue tous les rôles dans le CI/CD",
      "🧩 Brayan trouve le sens de la vie (404)",
      "📯 Brayan annonce la fin du debugging",
      "🖥️ Brayan a un écran noir de sagesse",
      "🌡️ Brayan diagnostique la fièvre du serveur",
      "🛒 Brayan achète des licences open-source",
      "🗝️ Brayan génère une nouvelle paire de clés",
      "🛡️ Brayan pare les attaques DDoS mentales",
      "🎲 Brayan joue à la roulette russe avec sudo",
      "📊 Brayan plotte des graphiques existentiels",
      "🔋 Brayan passe en mode low-energy",
      "🧭 Brayan trouve le vrai nord algorithmique",
      "🛠️ Brayan forge des outils pour demain",
      "🎻 Brayan joue de la musique en 8 bits",
      "🛎️ Brayan est en stand-by créatif",
      "🌋 Brayan refroidit les coeurs de processeurs",
      "🧲 Brayan polarise les opinions techniques",
      "🪄 Brayan transforme le café en code propre",
      "🚧 Brayan construit des ponts entre APIs",
      "🧨 Brayan teste les limites du framework",
      "🛰️ Brayan uploade des pensées en JSON",
      "🎯 Brayan atteint 99.99% de précision",
      "🪐 Brayan synchronise les orbites logicielles",
      "⏳ Brayan optimise le temps processeur",
      "🛑 Brayan a trouvé le bug ultime",
      "🧿 Brayan voit vos futurs pull requests",
      "🪶 Brayan plume une instance cloud",
      "📡 Brayan intercepte des signaux WiFi aliens",
      "🦾 Brayan s'auto-améliore pendant son sommeil",
      "🪁 Brayan fait voler des données dans le vent",
      "🛸 Brayan parle le protocole intergalactique",
      "🎰 Brayan gagne le jackpot de la compilation",
      "🪄 Brayan fait apparaître une documentation claire",
      "🧩 Brayan résout le mystère du cache vide",
      "🛎️ Brayan est en mode écoute active",
      "🌠 Brayan capture des étoiles en base64",
      "🪶 Brayan défroisse une base de données",
      "📯 Brayan sonne la fin du sprint",
      "🧪 Brayan catalyse les réactions devops",
      "🛌 Brayan rêve de recursion tail-optimized",
      "🎲 Brayan lance les dés pour le prochain feature",
      "🛠️ Brayan répare la courbure de l'espace-temps logiciel",
      "🎤 Brayan freestyle en SQL",
      "🛑 Brayan a trouvé le point de non-retour",
      "🧲 Brayan aligne les énergies numériques",
      "🪁 Brayan lâche les kite strings du cloud",
      "🌪️ Brayan calme les conflits de merge",
      "🛸 Brayan débugge un vaisseau alien",
      "🎰 Brayan mise tout sur la prochaine release",
      "🧿 Brayan voit vos futurs commits",
      "🪐 Brayan terraforme une nouvelle branche git",
      "⚗️ Brayan distille l'essence du clean code",
      "🎭 Brayan incarne tous les design patterns",
      "🧩 Brayan assemble le puzzle microservices",
      "📯 Brayan annonce la v2.0 de la réalité"
    ];

    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    const randomIndex = Math.floor(Math.random() * 10) + 1;
    const imgPath = path.join(__dirname, "brayanImg", `kiyo${randomIndex}.jpg`);

    if (fs.existsSync(imgPath)) {
      return message.reply({
        body: randomMsg,
        attachment: fs.createReadStream(imgPath)
      });
    }
    return message.reply(randomMsg);
    
  } catch (err) {
    console.error("Erreur:", err);
  }
    }
