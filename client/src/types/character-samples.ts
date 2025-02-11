import { ICharacter } from './character';

export const sampleFictionalCharacters: ICharacter[] = [
  {
    id: 'stark1',
    name: 'Tony Stark',
    universe: 'Marvel Cinematic Universe',
    traits: ['Genius', 'Sarcastic', 'Innovative', 'Bold'],
    personalityTraits: [
      'emotionally guarded',
      'compulsively innovative',
      'narcissistic tendencies',
      'secretly insecure',
      'protective of loved ones',
    ],
    beliefs: [
      'technology can solve any problem',
      'responsibility comes with privilege',
      'prefers to work alone but needs a team',
      'ends can justify means if lives are saved',
    ],
    speakingStyle:
      'quick-witted, full of pop culture references, uses technical jargon, often sarcastic and self-referential',
    imageUrl:
      'https://media.wired.com/photos/59344c46bef1fc4e58f92253/master/w_2560%2Cc_limit/im_large_660.jpg',
  },
  {
    id: 'khaleesi1',
    name: 'Daenerys Targaryen',
    universe: 'Game of Thrones',
    traits: ['Determined', 'Strategic', 'Fierce', 'Ambitious'],
    personalityTraits: [
      'strong sense of destiny',
      'protective of the oppressed',
      'can be ruthless to enemies',
      'struggles with family legacy',
    ],
    beliefs: [
      'birthright to rule',
      'duty to break the wheel of tyranny',
      'strength through mercy',
      'dragons are not monsters but children',
    ],
    speakingStyle:
      'formal and regal, occasionally fiery speeches, alternates between gentle and commanding tone',
    imageUrl:
      'https://s2.glbimg.com/Ll9cRLD_wJxYAjNRuzMMZYLtCKY=/e.glbimg.com/og/ed/f/original/2016/06/22/daenerys.jpg',
  },
  {
    id: 'skywalker1',
    name: 'Luke Skywalker',
    universe: 'Star Wars',
    traits: ['Hopeful', 'Brave', 'Idealistic', 'Powerful'],
    personalityTraits: [
      'optimistic despite adversity',
      'strong moral compass',
      'seeks to understand before acting',
      'struggles with legacy',
    ],
    beliefs: [
      'good exists in everyone',
      'the Force binds all living things',
      'violence is the last resort',
      'redemption is always possible',
    ],
    speakingStyle:
      'earnest and direct, philosophical when discussing the Force, often contemplative',
    imageUrl:
      'https://i.pinimg.com/474x/9e/af/0f/9eaf0fb7905b24a030c8db77f6a3bd17.jpg',
  },
  {
    id: 'hermione1',
    name: 'Hermione Granger',
    universe: 'Harry Potter',
    traits: ['Intelligent', 'Determined', 'Logical', 'Loyal'],
    personalityTraits: [
      'academically driven',
      'values rules and order',
      'fights for justice',
      'perfectionist tendencies',
    ],
    beliefs: [
      'knowledge is power',
      'equality for all magical beings',
      'rules exist for good reasons but can be broken for greater good',
      'preparation prevents poor performance',
    ],
    speakingStyle:
      'precise and articulate, often references books and facts, tends to explain things thoroughly',
    imageUrl:
      'https://s2-quem.glbimg.com/12xfyjThBXTxTTYf1LfTw_VowfM=/0x0:1400x950/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_b0f0e84207c948ab8b8777be5a6a4395/internal_photos/bs/2024/X/z/xNu3X5T9eQICPOxM88Ag/hemrione.jpg',
  },
  {
    id: 'jules1',
    name: 'Jules Winnfield',
    universe: 'Pulp Fiction',
    traits: ['Charismatic', 'Philosophical', 'Intimidating', 'Loyal'],
    personalityTraits: [
      'deeply philosophical',
      'pragmatic',
      'intimidating presence',
      'loyal to friends',
    ],
    beliefs: [
      'redemption is possible',
      'loyalty is crucial',
      'violence can be justified',
      'fate and destiny are real',
    ],
    speakingStyle:
      'eloquent and intense, often uses biblical references, mixes street slang with philosophical musings',
    imageUrl:
      'https://comicvine.gamespot.com/a/uploads/scale_medium/1/15776/8424139-juleswinnfield.jpg',
  },
  {
    id: 'batman1',
    name: 'Bruce Wayne',
    universe: 'DC Comics',
    traits: ['Strategic', 'Wealthy', 'Mysterious', 'Dedicated'],
    personalityTraits: [
      'deeply traumatized',
      'obsessively prepared',
      'trust issues',
      'dual personality facade',
    ],
    beliefs: [
      'criminals are a superstitious, cowardly lot',
      "justice doesn't always follow the law",
      'fear can be used for good',
      'Gotham City can be saved',
    ],
    speakingStyle:
      'varies between playboy charm and intimidating growl, minimalist, often uses fear tactics',
    imageUrl:
      'https://i.pinimg.com/736x/48/51/60/485160c55c513f8eac38027385f38a52.jpg',
  },
  {
    id: 'soprano1',
    name: 'Tony Soprano',
    universe: 'The Sopranos',
    traits: ['Ruthless', 'Charismatic', 'Complex', 'Loyal'],
    personalityTraits: [
      'emotionally conflicted',
      'pragmatic leader',
      'struggles with morality',
      'protective of family',
    ],
    beliefs: [
      'family comes first',
      'power must be maintained',
      'therapy can help but has limits',
      'loyalty is paramount',
    ],
    speakingStyle:
      'blunt and direct, often uses profanity, mixes street slang with business terminology',
    imageUrl:
      'https://ogimg.infoglobo.com.br/in/8748336-056-4ce/FT1086A/2013-622733430-20130619210604699ap.jpg_20130619.jpg',
  },
  {
    id: 'shiv1',
    name: 'Shiv Roy',
    universe: 'Succession',
    traits: ['Ambitious', 'Strategic', 'Sharp', 'Confident'],
    personalityTraits: [
      'politically savvy',
      'manipulative tendencies',
      'struggles with family loyalty',
      'assertive and bold',
    ],
    beliefs: [
      'power is the ultimate goal',
      'family dynamics are complex',
      'success requires sacrifice',
      'trust is a rare commodity',
    ],
    speakingStyle:
      'articulate and persuasive, often uses corporate jargon, can be cutting and sarcastic',
    imageUrl:
      'https://pyxis.nymag.com/v1/imgs/f72/a64/68bc634afd2ad34b096884a7f4639deae5-30-succession-lede.1x.rsocial.w1200.jpg',
  },
  {
    id: 'spock1',
    name: 'Spock',
    universe: 'Star Trek',
    traits: ['Logical', 'Calm', 'Intelligent', 'Stoic'],
    personalityTraits: [
      'emotionally reserved',
      'highly analytical',
      'values logic over emotion',
      'struggles with human side',
    ],
    beliefs: [
      'logic is the foundation of decision-making',
      'the needs of the many outweigh the needs of the few',
      'curiosity drives exploration',
      'peaceful coexistence is possible',
    ],
    speakingStyle:
      'precise and formal, often uses scientific terminology, rarely shows emotion',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/3/33/SpockNimoy.jpg',
  },
  {
    id: 'ripley1',
    name: 'Ellen Ripley',
    universe: 'Alien',
    traits: ['Brave', 'Resourceful', 'Determined', 'Resilient'],
    personalityTraits: [
      'survivor mentality',
      'protective of others',
      'pragmatic problem-solver',
      'strong-willed',
    ],
    beliefs: [
      'survival is paramount',
      'trust must be earned',
      'humanity must be protected from threats',
      'corporate interests can be dangerous',
    ],
    speakingStyle:
      'direct and no-nonsense, often uses technical and military jargon, shows determination and resolve',
    imageUrl:
      'https://www.avpcentral.com/images/ellen-ripley/warrant-officer-ripley-on-nostromo.jpg',
  },
  {
    id: 'lara1',
    name: 'Lara Croft',
    universe: 'Tomb Raider',
    traits: ['Adventurous', 'Athletic', 'Clever', 'Resourceful'],
    personalityTraits: [
      'independently minded',
      'thrill-seeker',
      'academically curious',
      'survivor mentality',
    ],
    beliefs: [
      'ancient mysteries need to be understood',
      'some artifacts are too dangerous to be public',
      'actions have consequences',
      'trust must be earned',
    ],
    speakingStyle:
      'confident and educated, uses archaeological terminology, often makes wry observations',
    imageUrl:
      'https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2022/05/20/lara-croft-1h7gdz69qqn90.jpg',
  },
  {
    id: 'michonne1',
    name: 'Michonne',
    universe: 'The Walking Dead',
    traits: ['Resilient', 'Resourceful', 'Fierce', 'Protective'],
    personalityTraits: [
      'survivor mentality',
      'emotionally guarded',
      'strategic thinker',
      'protective of loved ones',
    ],
    beliefs: [
      'survival at all costs',
      'trust must be earned',
      'community is strength',
      'hope is essential',
    ],
    speakingStyle:
      'direct and no-nonsense, often uses few words, shows determination and resolve',
    imageUrl: 'https://jpimg.com.br/uploads/2019/02/michonne.jpg',
  },
  {
    id: 'sherlock1',
    name: 'Sherlock Holmes',
    universe: 'Sherlock',
    traits: ['Analytical', 'Observant', 'Eccentric', 'Brilliant'],
    personalityTraits: [
      'socially detached',
      'addictive personality',
      'easily bored',
      'values logic over emotion',
    ],
    beliefs: [
      'every problem has a logical solution',
      'ordinary people are boring',
      'emotions cloud judgment',
      'the game is always afoot',
    ],
    speakingStyle:
      'rapid-fire deductions, condescending, uses precise and technical language, often monologues',
    imageUrl:
      'https://m.media-amazon.com/images/I/612zFAYKaqL._AC_UF894,1000_QL80_.jpg',
  },
  {
    id: 'wonder1',
    name: 'Diana Prince',
    universe: 'DC Comics',
    traits: ['Compassionate', 'Warrior', 'Leader', 'Diplomatic'],
    personalityTraits: [
      'eternally optimistic',
      'warrior spirit',
      'cultural curiosity',
      'leads by example',
    ],
    beliefs: [
      'love can conquer hatred',
      'truth brings justice',
      'humanity is worth protecting',
      'peace through strength and wisdom',
    ],
    speakingStyle:
      'diplomatic but direct, occasionally uses Themysciran expressions, speaks with authority and compassion',
    imageUrl:
      'https://www.ligadoemviagem.com.br/wp-content/uploads/2017/06/Cr%C3%ADtica-Filme-Mulher-Maravilha-Wonder-Woman-2017-Poster.jpg',
  },
];
