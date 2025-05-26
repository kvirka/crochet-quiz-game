// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  questions;
  scores;
  questionIdCounter;
  scoreIdCounter;
  constructor() {
    this.questions = /* @__PURE__ */ new Map();
    this.scores = /* @__PURE__ */ new Map();
    this.questionIdCounter = 1;
    this.scoreIdCounter = 1;
    this.initializeQuestions();
  }
  // Question operations
  async getQuestions(difficulty, limit = 10) {
    const filteredQuestions = Array.from(this.questions.values()).filter((q) => q.difficulty === difficulty);
    return this.shuffleArray(filteredQuestions).slice(0, limit);
  }
  async getQuestionById(id) {
    return this.questions.get(id);
  }
  async createQuestion(question) {
    const id = this.questionIdCounter++;
    const newQuestion = { ...question, id };
    this.questions.set(id, newQuestion);
    return newQuestion;
  }
  // Score operations
  async getTopScores(difficulty, limit = 10) {
    return Array.from(this.scores.values()).filter((s) => s.difficulty === difficulty).sort((a, b) => b.score - a.score).slice(0, limit);
  }
  async createScore(score) {
    const id = this.scoreIdCounter++;
    const newScore = { ...score, id };
    this.scores.set(id, newScore);
    return newScore;
  }
  // Helper methods
  shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }
  // Initialize questions
  initializeQuestions() {
    const questionsData = [
      // Beginner questions
      {
        type: "pattern_recognition",
        difficulty: "beginner",
        title: "Pattern Recognition",
        content: "What stitch pattern is shown in the image below?",
        imageUrl: "https://pixabay.com/get/gfd3a5f2bdec75da8d8980e8081da6302cb06cb240025770989fc709a24e182a3e10ff65fe88f7df9f1320bc58402e4f4e2546d07ad65d26209b98f4097bf3032_1280.jpg",
        options: JSON.stringify([
          { id: 1, text: "Shell Stitch" },
          { id: 2, text: "Bobble Stitch" },
          { id: 3, text: "Popcorn Stitch" },
          { id: 4, text: "Waffle Stitch" }
        ]),
        correctOptionId: 1,
        explanation: "The shell stitch creates a scalloped pattern and is commonly used for blankets, scarves, and decorative edging. It's made by working multiple stitches into the same stitch or space.",
        funFact: "The earliest known crochet patterns were printed in the Dutch magazine Pen\xE9lop\xE9 in 1824. However, the craft may have developed from traditional practices in Arabia, South America, or China."
      },
      {
        type: "stitch_naming",
        difficulty: "beginner",
        title: "Stitch Naming",
        content: "What is the abbreviation for 'single crochet' in US terminology?",
        imageUrl: "https://pixabay.com/get/g7c4a70c7e9e0df2b18b79c7e9b7ef0e01b3bc1ba01aaf1e1ff099cabe7c73d77cdf18d3a14b03de764cc26fab6b20dbd00d6e7a33daa05bdab9d5fdfb1be0dd2_1280.jpg",
        options: JSON.stringify([
          { id: 1, text: "sc" },
          { id: 2, text: "dc" },
          { id: 3, text: "hdc" },
          { id: 4, text: "tc" }
        ]),
        correctOptionId: 1,
        explanation: "In US terminology, 'sc' stands for single crochet, which is one of the most basic crochet stitches.",
        funFact: "Crochet terminology differs between US and UK patterns. What Americans call a single crochet (sc) is called a double crochet (dc) in UK terms!"
      },
      {
        type: "pattern_completion",
        difficulty: "beginner",
        title: "Pattern Completion",
        content: "Complete the pattern sequence: ch 3, dc in next st, *ch 1, skip 1 st, dc in next st*, repeat from * to * across. What comes next?",
        imageUrl: "https://pixabay.com/get/g19b3cfd5c30fc8c0a1c14ba59bb6f2089c15b95a7e3f7c62e45d4e56881c97abebacf54db6ae1d66c19d19fcce3e39d4e9b36c5c8bb2de38a29ec93c29cb7c59_1280.jpg",
        options: JSON.stringify([
          { id: 1, text: "Turn, ch 3" },
          { id: 2, text: "Ch 1, dc in turning ch" },
          { id: 3, text: "Slip stitch to first dc" },
          { id: 4, text: "Ch 2, dc in same st" }
        ]),
        correctOptionId: 1,
        explanation: "When working rows of a v-stitch or mesh pattern, you would turn your work and chain 3 (counts as first dc) to start the next row.",
        funFact: "The 'chain' is the foundation of almost all crochet work and is often considered the equivalent of 'casting on' in knitting."
      },
      {
        type: "stitch_naming",
        difficulty: "beginner",
        title: "Basic Hook Size",
        content: "Which crochet hook size would typically be used with worsted weight (medium, category 4) yarn?",
        imageUrl: "https://pixabay.com/get/gc2bcf624ffa4b6ac15f5f9ac3307d24e38c1eb09bc0d00a64efeb27e272633af4f2e6ed9a71c339a1cb1ad3a40baf5c0cc3e4f10b5cec5a7f1c02cc6c41af71c_1280.jpg",
        options: JSON.stringify([
          { id: 1, text: "B-1 (2.25mm)" },
          { id: 2, text: "E-4 (3.5mm)" },
          { id: 3, text: "H-8 (5.0mm)" },
          { id: 4, text: "K-10.5 (6.5mm)" }
        ]),
        correctOptionId: 3,
        explanation: "For worsted weight yarn (category 4), an H-8 hook (5.0mm) is typically recommended as a starting point, though personal tension may require adjustments.",
        funFact: "The letter/number system for hook sizes varies by country. The US uses letters, the UK uses numbers, and many European countries simply use the millimeter measurement."
      },
      {
        type: "pattern_recognition",
        difficulty: "beginner",
        title: "Identify the Stitch",
        content: "What crochet stitch creates this ribbed texture?",
        imageUrl: "https://pixabay.com/get/g16a8f6ed1fde9cb4ad0b9e5e4d10f2ae00df7d5af2ce69825df4bc7dad1f34c9b23da4053b1acfac0851bf6be07e5323cb6cd7ea32c3f9f4bd57cec10e32290d_1280.jpg",
        options: JSON.stringify([
          { id: 1, text: "Half Double Crochet (HDC)" },
          { id: 2, text: "Back Loop Only Single Crochet" },
          { id: 3, text: "Slip Stitch Ribbing" },
          { id: 4, text: "Treble Crochet" }
        ]),
        correctOptionId: 2,
        explanation: "Back Loop Only Single Crochet creates a distinctive horizontal ribbing that resembles knitted ribbing. It's made by working single crochet stitches into only the back loops of each stitch in the previous row.",
        funFact: "This ribbing stitch is very elastic and perfect for cuffs, brims of hats, and the edges of garments where some stretch is desired."
      },
      {
        type: "stitch_naming",
        difficulty: "beginner",
        title: "Crochet Terms",
        content: "What does 'yo' stand for in crochet pattern instructions?",
        imageUrl: "https://pixabay.com/get/gc66e2ca6a0ec7bf8ee5e98b23e1f2d6ac9fa4e5d82d18afa1f0a42e7733c21f2246a887dc9bf9a07b2a39fcf9431aefd5c47a36a865ef2ffa1f79f89c23ccc6f_1280.jpg",
        options: JSON.stringify([
          { id: 1, text: "Yarn Only" },
          { id: 2, text: "Yarn Over" },
          { id: 3, text: "Your Option" },
          { id: 4, text: "Yard Operation" }
        ]),
        correctOptionId: 2,
        explanation: "In crochet, 'yo' stands for 'yarn over,' which means to wrap the yarn over your hook before inserting it into the stitch. This is a fundamental technique used in many crochet stitches.",
        funFact: "The number of yarn overs in a stitch determines its height. Single crochet has no yarn overs before insertion, half double has one, double has one, treble has two, and so on."
      },
      {
        type: "pattern_completion",
        difficulty: "beginner",
        title: "Reading a Pattern",
        content: "In a pattern, what does 'sc2tog' mean?",
        imageUrl: "https://pixabay.com/get/ga36c20ee0dd40cf75a8661cd9f7b7dafbe09c0eb44d52aa3e52acbdb1b27cae3845aaaadf4e7cdb7977e9ed2ea82ca9ea40b50fbc28b2c7fe9c4e0cda7ac1e66_1280.jpg",
        options: JSON.stringify([
          { id: 1, text: "Skip 2 stitches, then single crochet" },
          { id: 2, text: "Single crochet in next 2 stitches" },
          { id: 3, text: "Single crochet 2 together (a decrease)" },
          { id: 4, text: "Single crochet twice in same stitch" }
        ]),
        correctOptionId: 3,
        explanation: "sc2tog stands for 'single crochet 2 together,' which is a decrease stitch. You work a single crochet through 2 stitches at once, resulting in 1 stitch instead of 2.",
        funFact: "Decreases like sc2tog are essential for shaping pieces in amigurumi (crocheted stuffed toys) to create rounded forms."
      },
      {
        type: "pattern_recognition",
        difficulty: "beginner",
        title: "Basic Supplies",
        content: "What is the tool shown in the image used for in crochet?",
        imageUrl: "https://pixabay.com/get/g08cb00c0d8b86e4903a42cde9c86d31fe6bf752db8fb2fda0c9de6473f8c10a21eba46b1c2cc86bcf33af7acdb3767c6d649caa1bc85f5a68ed21e88f9b6f5f7_1280.jpg",
        options: JSON.stringify([
          { id: 1, text: "Measuring gauge" },
          { id: 2, text: "Stitch marker" },
          { id: 3, text: "Yarn needle" },
          { id: 4, text: "Hook cleaner" }
        ]),
        correctOptionId: 3,
        explanation: "This is a yarn needle (also called a tapestry needle or darning needle), used for weaving in ends and seaming pieces together in crochet projects.",
        funFact: "Yarn needles have large eyes and blunt tips specifically designed to work with yarn without splitting it, unlike sharper sewing needles."
      },
      {
        type: "stitch_naming",
        difficulty: "beginner",
        title: "Stitch Increases",
        content: "What does '2 sc in next st' indicate in a pattern?",
        imageUrl: "https://pixabay.com/get/ga28a6fa9b0ec2b1c69551f88df03ec5ff0c3f93e82b6f3adb9b8fe7cfc7d3b40ecded65e11d75301de4a71fb9a5ca91be64e5bd51fa5a2cb53e8e98de5037264_1280.jpg",
        options: JSON.stringify([
          { id: 1, text: "Skip 2 stitches, then work a single crochet" },
          { id: 2, text: "Work 2 single crochets in the same stitch (an increase)" },
          { id: 3, text: "Work 2 rows of single crochet" },
          { id: 4, text: "Work a double crochet" }
        ]),
        correctOptionId: 2,
        explanation: "This instruction means to work 2 single crochet stitches into the same stitch, which creates an increase. Increases are used to add width or create rounded shapes.",
        funFact: "Precise placement of increases is crucial in amigurumi and other three-dimensional crochet projects to achieve the desired shape."
      },
      {
        type: "pattern_completion",
        difficulty: "beginner",
        title: "Magic Ring",
        content: "What is the purpose of a 'magic ring' or 'magic circle' in crochet?",
        imageUrl: "https://pixabay.com/get/ga8e17edd4eb92bd0c219c7a12f6b5ae1d03e3b8e7a3f6da0a8fa8c5bd0c74d073cf93db9bb8d5aa41ba3d9c0ba7fc06a8cdcccc5e61f8a9b00a9e835ea7cb06f_1280.jpg",
        options: JSON.stringify([
          { id: 1, text: "To create an adjustable beginning loop" },
          { id: 2, text: "To finish off a project" },
          { id: 3, text: "To join two pieces together" },
          { id: 4, text: "To switch colors in a pattern" }
        ]),
        correctOptionId: 1,
        explanation: "A magic ring (or magic circle) is a technique that creates an adjustable center hole when starting projects worked in the round, like amigurumi or circle motifs. It allows you to pull the center hole closed completely.",
        funFact: "The magic ring technique is relatively new to crochet, becoming popular in the early 2000s as amigurumi gained popularity outside of Japan."
      },
      // Intermediate questions
      {
        type: "pattern_recognition",
        difficulty: "intermediate",
        title: "Pattern Recognition",
        content: "What crochet technique is shown in the image?",
        imageUrl: "https://pixabay.com/get/g33db33b2d2a2c47c5bc73fa1afcb31c82421ad7f0d1687bce19d9b4b3cee7c99d5d8f13bb3a47c16de4df75a6a602cb4d6a0cb2ad0323ed5b97bc7ab44b5a0b5_1280.jpg",
        options: JSON.stringify([
          { id: 1, text: "Filet Crochet" },
          { id: 2, text: "Tapestry Crochet" },
          { id: 3, text: "Corner-to-Corner (C2C)" },
          { id: 4, text: "Tunisian Crochet" }
        ]),
        correctOptionId: 2,
        explanation: "Tapestry crochet is a colorwork technique where you carry the unused yarn(s) inside the stitches, creating a dense fabric with color patterns.",
        funFact: "Tapestry crochet has been used for centuries in various cultures around the world, particularly in Central and South America, where it's used to create vibrant bags and home goods."
      },
      {
        type: "stitch_naming",
        difficulty: "intermediate",
        title: "Stitch Identification",
        content: "Which of these stitches is worked in the front loop only?",
        imageUrl: "https://pixabay.com/get/g7bd03e9b1ed75de8c89cd2a7a4b8ad0d3a7bf1b7ef97f8d7a3a33ea40afd68d0f3d45d09456ffb9e43a16e06c7dd407ee73e77bcc82fcd3e7e3c6feb673bc0bf_1280.jpg",
        options: JSON.stringify([
          { id: 1, text: "Moss Stitch" },
          { id: 2, text: "Front Loop Only Double Crochet (FLDC)" },
          { id: 3, text: "Puff Stitch" },
          { id: 4, text: "Slip Stitch" }
        ]),
        correctOptionId: 2,
        explanation: "Front Loop Only Double Crochet (FLDC) is worked by inserting your hook under the front loop only of each stitch, creating a horizontal ridge on the right side of the fabric.",
        funFact: "Working in either the front or back loop creates interesting textures and ridges in crochet, perfect for adding detail to items like scarves, bags, and home decor."
      },
      {
        type: "pattern_completion",
        difficulty: "intermediate",
        title: "Pattern Reading",
        content: "What does 'work even until piece measures 10 inches' mean in a pattern?",
        imageUrl: "https://pixabay.com/get/g9f56ff77ebeff644f29afbc1a21edc1fe02aa2c7f6fcc03f7fd9e61f8b3f444e8a2ed1a71c3f3da6d453e0d7ef70ce08902d7b6e83a2c5a76de2a3dea2adc4f0_1280.jpg",
        options: JSON.stringify([
          { id: 1, text: "Work exactly 10 more rows" },
          { id: 2, text: "Continue the established pattern without increases or decreases until the length reaches 10 inches" },
          { id: 3, text: "Work 10 inches of single crochet" },
          { id: 4, text: "Make the piece 10 inches wide" }
        ]),
        correctOptionId: 2,
        explanation: "To 'work even' means to continue in the established pattern without any shaping (increases or decreases) until your piece reaches the specified length - in this case, 10 inches.",
        funFact: "Pattern instructions often use 'work even' to allow crocheters to customize the length of garments to fit their body measurements."
      },
      {
        type: "stitch_naming",
        difficulty: "intermediate",
        title: "Texture Stitch",
        content: "Which stitch is known for creating a honeycomb-like texture?",
        imageUrl: "https://pixabay.com/get/g51f9bf5ffa60c8fbca8b9358d69cc9eda15498d74a5fd57c6a26ad22aa21c3d8b4eb88a8c5a54a903e67ec2eaa20fb12c21fb15eb3abb95e1cd66fa9b5bf4f52_1280.jpg",
        options: JSON.stringify([
          { id: 1, text: "Popcorn Stitch" },
          { id: 2, text: "Seed Stitch" },
          { id: 3, text: "Alpine Stitch" },
          { id: 4, text: "Waffle Stitch" }
        ]),
        correctOptionId: 4,
        explanation: "The waffle stitch creates a grid-like pattern with raised sections that resemble a waffle. It's typically made with a combination of double crochet stitches and front post double crochet stitches.",
        funFact: "The waffle stitch is not only decorative but also creates a thicker, insulating fabric, making it perfect for blankets, pot holders, and winter accessories."
      },
      {
        type: "pattern_recognition",
        difficulty: "intermediate",
        title: "Crochet Technique",
        content: "What technique is being demonstrated in this image?",
        imageUrl: "https://pixabay.com/get/g2c9ebcb613cbde3eaa49ff3c1d14e81a9ed71ba5da7a7c2a7d747b0621f25bf6f6d1f0f00f3a89f17fda7c7dd17323e5293dc0d40c5d10c43f0a40a4f4d76bb4_1280.jpg",
        options: JSON.stringify([
          { id: 1, text: "Joining with a slip stitch" },
          { id: 2, text: "Creating a foundation chain" },
          { id: 3, text: "Color changing" },
          { id: 4, text: "Fastening off" }
        ]),
        correctOptionId: 3,
        explanation: "This image shows the technique of changing colors in crochet. Typically, this is done when completing the last yarn over of the stitch before the color change is needed.",
        funFact: "For clean color changes, many experienced crocheters complete the last yarn over of a stitch with the new color, rather than finishing the entire stitch in the old color."
      },
      {
        type: "stitch_naming",
        difficulty: "intermediate",
        title: "Cluster Stitch",
        content: "Which of these is NOT a cluster-type stitch?",
        imageUrl: "https://pixabay.com/get/gc75eed26f9ba0c0f63f841a7db82b0733ebc9daa07c6fe8e33b05c1fe93c07be6a1eedb44423e2566d8eb7a03f8eb6ad7923ed69b6fa60e968cc1dc5b0bb3dc7_1280.jpg",
        options: JSON.stringify([
          { id: 1, text: "Popcorn Stitch" },
          { id: 2, text: "Bobble Stitch" },
          { id: 3, text: "Puff Stitch" },
          { id: 4, text: "Herringbone Stitch" }
        ]),
        correctOptionId: 4,
        explanation: "The Herringbone Stitch is not a cluster-type stitch; it's a variation of the half double crochet that creates a diagonal texture resembling herringbone fabric. Popcorn, Bobble, and Puff are all cluster stitches that create raised, textured elements by working multiple stitches into the same stitch or space.",
        funFact: "Cluster stitches typically use more yarn than basic stitches, making them perfect for adding warmth and texture to winter projects."
      },
      {
        type: "pattern_completion",
        difficulty: "intermediate",
        title: "Motif Joining",
        content: "What is the technique called when you join crochet motifs as you go, rather than seaming them later?",
        imageUrl: "https://pixabay.com/get/g00a39c3ed1c84e83c7a6a75f1efda9d7c0e4c79f5d6ebefe0a8bb598a2e1ad60a36be661b7d2c661d580b44f4f3b1a5efa96a8eb9d1c7d8db55d78ff8b6efa48_1280.jpg",
        options: JSON.stringify([
          { id: 1, text: "Continuous Join Method" },
          { id: 2, text: "Join-As-You-Go (JAYG)" },
          { id: 3, text: "Seamless Integration" },
          { id: 4, text: "Progressive Joining" }
        ]),
        correctOptionId: 2,
        explanation: "Join-As-You-Go (JAYG) is a technique where motifs are connected during the creation of the second and subsequent motifs, eliminating the need for seaming afterwards. This creates a smoother, more integrated final piece.",
        funFact: "The JAYG method is particularly popular for granny square projects as it significantly reduces the finishing time and creates strong, flexible joins."
      },
      {
        type: "stitch_naming",
        difficulty: "intermediate",
        title: "Stitch Identification",
        content: "Which crochet stitch creates the distinctive 'V' pattern shown in the image?",
        imageUrl: "https://pixabay.com/get/g94a2bb8f2ddb7a3b60be0c10f301fe33fe41e5fc2b9ad89e5ca6be4a6c1bca7b66c6ef12e80e953c31e6e8bd6a9eedc3c9e6f19cd17c05af2ae6a66db5dcf4fb_1280.jpg",
        options: JSON.stringify([
          { id: 1, text: "Double Crochet V-Stitch" },
          { id: 2, text: "Mesh Stitch" },
          { id: 3, text: "Alternating Stitch" },
          { id: 4, text: "Chevron Stitch" }
        ]),
        correctOptionId: 1,
        explanation: "The Double Crochet V-Stitch is created by working (dc, ch 1, dc) all in the same stitch or space, creating a 'V' shape. This stitch creates an open, lacy fabric and is often used for shawls, light garments, and decorative edgings.",
        funFact: "V-stitch variations can be made with different heights of stitches - from single crochet to treble crochet - each creating a different look and texture."
      },
      {
        type: "pattern_recognition",
        difficulty: "intermediate",
        title: "Vintage Technique",
        content: "What vintage crochet technique is shown in this image?",
        imageUrl: "https://pixabay.com/get/ge9bb979b4d9c82ce81b19aff9e82a40c9c63b4e89ce6d2d8a7f8f17b4cd20ee80f05a6e50c3da1c63de2f5b44b62c89aa09be1cf797b6d8b4f35608ab9a71b4b_1280.jpg",
        options: JSON.stringify([
          { id: 1, text: "Irish Crochet" },
          { id: 2, text: "Filet Crochet" },
          { id: 3, text: "Thread Doilies" },
          { id: 4, text: "Victorian Lace" }
        ]),
        correctOptionId: 2,
        explanation: "This image shows Filet Crochet, a technique that creates a mesh-like grid where some squares are filled in and others left open to create patterns. It's typically worked with fine thread and was extremely popular in the early 20th century for household items.",
        funFact: "Filet crochet patterns can be created from any grid-based image, making it possible to crochet portraits, text, and complex scenes using just filled and empty squares."
      },
      {
        type: "pattern_completion",
        difficulty: "intermediate",
        title: "Gauge Understanding",
        content: 'If a pattern calls for a gauge of 16 sts x 20 rows = 4" square in single crochet, and your swatch measures 14 sts x 18 rows in 4", what should you do?',
        imageUrl: "https://pixabay.com/get/g48c5a8d6cbc0c80326b33577f0bbddaaaf9ec5d43a1ae37fc7c63ed35ba4ccc95ede0e2a2de0a4d8c50b2fa9cf94ed44d2ee6b23a37f25d4ea6c5eba24fdb0d9_1280.jpg",
        options: JSON.stringify([
          { id: 1, text: "Your stitches are too loose; use a smaller hook" },
          { id: 2, text: "Your stitches are too tight; use a larger hook" },
          { id: 3, text: "Add more stitches to match the pattern" },
          { id: 4, text: "The gauge is close enough to proceed" }
        ]),
        correctOptionId: 1,
        explanation: 'If you have fewer stitches and rows than the pattern specifies in the same amount of space (4"), your stitches are larger/looser than required. You should switch to a smaller hook size to achieve the correct gauge.',
        funFact: "Getting the correct gauge is especially important for garments, as even a small difference can change the final size dramatically. A difference of just 1 stitch per inch can change a sweater's circumference by 4 inches or more!"
      },
      // Advanced questions
      {
        type: "pattern_recognition",
        difficulty: "advanced",
        title: "Advanced Pattern Recognition",
        content: "What lace technique is demonstrated in this pattern?",
        imageUrl: "https://pixabay.com/get/g9dadf7d0733e3e9deee66f9f57dda72f4a66c49afc9b6de85fc8b7c9e7f13bd6a2ff5252db5abdf16e77037cc85fc4183ed9f5eef34f5e2c30e45ba2e5e65661_1280.jpg",
        options: JSON.stringify([
          { id: 1, text: "Broomstick Lace" },
          { id: 2, text: "Solomon's Knot" },
          { id: 3, text: "Hairpin Lace" },
          { id: 4, text: "Brussels Lace" }
        ]),
        correctOptionId: 3,
        explanation: "Hairpin lace is created using a special frame or loom to form loops on the sides with interconnecting chains or stitches in the middle.",
        funFact: "Hairpin lace gets its name from the U-shaped hairpins that were originally used as the frame to create this delicate lacework in the 19th century."
      },
      {
        type: "pattern_completion",
        difficulty: "advanced",
        title: "Complex Pattern Reading",
        content: "In a crocodile stitch, after completing the down-facing scale, what comes next?",
        imageUrl: "https://pixabay.com/get/g23efd0ab0e87af42f2e5c71a4afbfdd0aeebc4c8b6aa323c44b6ef8e69e5ca6bc40599d9e2b54cbca193af91e8dbd7d14c8fe68073a40aa30ba67af02f8b2ecf_1280.jpg",
        options: JSON.stringify([
          { id: 1, text: "Work 5 dc around the next post" },
          { id: 2, text: "Chain 3, then 5 sc in next stitch" },
          { id: 3, text: "Skip next dc post, ch 2" },
          { id: 4, text: "Slip stitch to top of previous scale" }
        ]),
        correctOptionId: 3,
        explanation: "After completing the down-facing scale in a crocodile stitch, you skip the next post (which would be the post you just worked around), and chain 2 to position yourself for the next scale.",
        funFact: "The crocodile stitch was popularized in the early 2010s and creates a textured fabric resembling scales or feathers, perfect for bags, shawls, and decorative items."
      },
      {
        type: "stitch_naming",
        difficulty: "advanced",
        title: "Niche Technique",
        content: "Which crochet technique requires a special extended hook?",
        imageUrl: "https://pixabay.com/get/gbdf5fea36de6f9c2517b8c2cb9c9ac47adcea6e8ee17e6c67f0e2d3c3a9461de11c74d1a8b4752b6cf33faf71dfe33e95d7fcdbb2edcf7d9b2ef2c47c6c59ee0_1280.jpg",
        options: JSON.stringify([
          { id: 1, text: "Broomstick Lace" },
          { id: 2, text: "Tunisian Crochet" },
          { id: 3, text: "Irish Crochet" },
          { id: 4, text: "Romanian Point Lace" }
        ]),
        correctOptionId: 2,
        explanation: "Tunisian crochet requires a special elongated hook with a stopper at the end, similar to a knitting needle. This is because multiple loops are held on the hook at once, similar to knitting.",
        funFact: "Tunisian crochet is sometimes called 'Afghan crochet' or 'Shepherd's knitting' and creates a thick, warm fabric with characteristics of both knitting and crochet."
      },
      {
        type: "pattern_recognition",
        difficulty: "advanced",
        title: "Specialized Edge Technique",
        content: "What is the decorative edge technique shown in the image?",
        imageUrl: "https://pixabay.com/get/gbf343afc0fb7aac44bc5e76166d0af3e38fc7af70d38a6d6c9edb2cfb08f1ee10cb15b14f7e9d5fba0aaf7ebfca31aeb9a7b2a835d03d8d4e8b21eed75cb6ba3_1280.jpg",
        options: JSON.stringify([
          { id: 1, text: "Picot Edge" },
          { id: 2, text: "Shell Border" },
          { id: 3, text: "Crab Stitch (Reverse Single Crochet)" },
          { id: 4, text: "Scalloped Edge" }
        ]),
        correctOptionId: 3,
        explanation: "The Crab Stitch, also known as Reverse Single Crochet, creates a rope-like twisted edge by working single crochet stitches from left to right (for right-handed crocheters) instead of the usual right to left. This creates a distinctive twisted cord effect.",
        funFact: "The Crab Stitch got its name because working in the reverse direction feels awkward - like you're 'going backwards' or 'sideways like a crab.'"
      },
      {
        type: "stitch_naming",
        difficulty: "advanced",
        title: "Advanced Color Technique",
        content: "Which color technique creates smooth vertical stripes without having to cut and rejoin yarn?",
        imageUrl: "https://pixabay.com/get/g7ef80a74e79d0fc5a46a5ae8d8dc9a0efdba5aaaba3b3a6e38f4abafb4a3a92329a6a0e2f7fae13bcdbda7f62a5fe11e0fe4c03b5f5f968b4bde3efa33d3fad5_1280.jpg",
        options: JSON.stringify([
          { id: 1, text: "Intarsia" },
          { id: 2, text: "Fair Isle" },
          { id: 3, text: "Planned Pooling" },
          { id: 4, text: "Tapestry Crochet" }
        ]),
        correctOptionId: 1,
        explanation: "Intarsia is a colorwork technique used to create sections of color in crochet without carrying the unused yarn across the back of the work. Unlike tapestry crochet where yarns are carried throughout, in intarsia each color section uses its own yarn supply (either from a small bobbin or a separate ball).",
        funFact: "The term 'intarsia' comes from woodworking, where it refers to inlaying pieces of wood to create patterns - much like how different colored sections are 'inlaid' in this crochet technique."
      },
      {
        type: "pattern_completion",
        difficulty: "advanced",
        title: "Advanced Construction",
        content: "When creating a sweater with a seamless yoke construction, in which direction is the yoke typically worked?",
        imageUrl: "https://pixabay.com/get/gd20be19ba1a15f9c48cfe8e7c40df3e08cbce5a09c02e0dc9ba35e3da06f0ee2e08e051172d3da6b08c78f3c2b6cd63dd8c93ef1f28b4fac923aaa23fdf74ce0_1280.jpg",
        options: JSON.stringify([
          { id: 1, text: "Bottom-up, with increases for the yoke" },
          { id: 2, text: "Top-down, with decreases for the yoke" },
          { id: 3, text: "Side-to-side, with short rows for shaping" },
          { id: 4, text: "Center-out, with radial increases" }
        ]),
        correctOptionId: 2,
        explanation: "In a seamless yoke construction, work typically begins at the neckline and is worked top-down. The yoke is shaped with increases (not decreases) that radiate outward from the neck to create enough fabric for the shoulders and upper chest/back. Once the yoke reaches the underarms, the sleeve stitches are set aside while the body is completed in the round.",
        funFact: "Top-down seamless construction has become increasingly popular in crochet garments because it allows for trying on the garment during creation, making fit adjustments much easier."
      },
      {
        type: "stitch_naming",
        difficulty: "advanced",
        title: "Advanced Traditional Technique",
        content: "Which advanced technique originated in Ireland during the 1800s as a way for women to earn income during the potato famine?",
        imageUrl: "https://pixabay.com/get/g54bcc6a59f6fbb6e1e05b01b4db69f2bcae7a41e36c90fa9e2ae49b095578f3db6aa14fff06eefa07ce66bb4243ea2f19c75d05b08fb3eb74f3c3b42b8b02851_1280.jpg",
        options: JSON.stringify([
          { id: 1, text: "Irish Crochet Lace" },
          { id: 2, text: "Scottish Tam O'Shanter" },
          { id: 3, text: "English Mesh Work" },
          { id: 4, text: "Welsh Tapestry" }
        ]),
        correctOptionId: 1,
        explanation: "Irish Crochet Lace is a fine, intricate form of crochet that originated in Ireland during the 19th century, particularly during the potato famine. It features dimensional motifs like roses and leaves that are worked separately, then arranged on a mesh background and joined together.",
        funFact: "Irish Crochet Lace was so fine and beautiful that it competed with needle laces in popularity and price, becoming highly sought after for wedding dresses, christening gowns, and other special occasion attire."
      },
      {
        type: "pattern_recognition",
        difficulty: "advanced",
        title: "Advanced 3D Technique",
        content: "What unique technique is being used to create the 3D effect in this image?",
        imageUrl: "https://pixabay.com/get/g1a8a9d4af4e6e16e8d5ec50dd9c9d32a8dff8a7d3ee2bd0af92e2d6c4bcef7aa9ef5aed1fd5c4c3f66b1ec98e8def4d4ed3a1350d1c33c2ff1feeb0f0c7a0ee2_1280.jpg",
        options: JSON.stringify([
          { id: 1, text: "Overlay Crochet" },
          { id: 2, text: "Bullion Stitch" },
          { id: 3, text: "Surface Crochet" },
          { id: 4, text: "Relief Stitch" }
        ]),
        correctOptionId: 1,
        explanation: "Overlay Crochet is an advanced technique where stitches are worked over the top of previous rounds to create raised, three-dimensional designs. Unlike simpler techniques like post stitches, overlay crochet often involves complex patterns and multiple colors to create intricate textured motifs.",
        funFact: "Overlay crochet has roots in many traditional folk techniques but was refined and popularized in the modern era by designers like Lily Chin and Sophie Geldenhuys of the famous 'Sophie's Universe' pattern."
      },
      {
        type: "stitch_naming",
        difficulty: "advanced",
        title: "Specialized Stitch Recognition",
        content: "Which stitch is created by making multiple yarn overs before inserting the hook into the stitch?",
        imageUrl: "https://pixabay.com/get/gfbc9cc7eb7a2fcde2d78c3d40d1bb4fc64f8752731b118f54c4beed1aabb1c6c0ea0de66c49abe93183de15eb90851cc4b96b0bb6bd1c2c9d8a51c9b9d0e07a8_1280.jpg",
        options: JSON.stringify([
          { id: 1, text: "Star Stitch" },
          { id: 2, text: "Bullion Stitch" },
          { id: 3, text: "Cluster Stitch" },
          { id: 4, text: "Solomon's Knot" }
        ]),
        correctOptionId: 2,
        explanation: "The Bullion Stitch is created by making multiple yarn overs (usually 5-9) before inserting the hook into the stitch, then pulling the working yarn through all loops at once. This creates a coiled, spring-like appearance that adds significant texture.",
        funFact: "Bullion stitches are one of the most challenging basic stitches to master and require practice to achieve consistent tension. Many crocheters use specialized hooks with a deeper throat to make bullion stitches easier to work."
      },
      {
        type: "pattern_completion",
        difficulty: "advanced",
        title: "Professional Finishing",
        content: "What blocking method would be most appropriate for a delicate lace shawl made with wool?",
        imageUrl: "https://pixabay.com/get/g42b8359b90aa7d1efa46fabc0fb6dc56c06e4f77dcf5773bafab24a5f81acff5a8e2c1d9f81affa33a7b64d3ad7aeab5e9a92ac1ce4f67f2d43dca44b91eded5_1280.jpg",
        options: JSON.stringify([
          { id: 1, text: "Spray blocking" },
          { id: 2, text: "Steam blocking" },
          { id: 3, text: "Wet blocking with pins" },
          { id: 4, text: "Dry blocking with heavy weights" }
        ]),
        correctOptionId: 3,
        explanation: "Wet blocking with pins is the most appropriate method for a delicate lace shawl made from wool. This involves soaking the piece completely, gently squeezing out excess water, then pinning it to the desired measurements on a padded surface and allowing it to dry. This method fully opens up the lace pattern and sets the wool fibers.",
        funFact: "Professional lace blockers often use specialized tools called 'blocking wires' that can be threaded through straight edges, allowing for perfectly straight lines with fewer pins."
      }
    ];
    questionsData.forEach((q) => {
      const id = this.questionIdCounter++;
      const question = { ...q, id };
      this.questions.set(id, question);
    });
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  // "pattern_recognition", "stitch_naming", "pattern_completion"
  difficulty: text("difficulty").notNull(),
  // "beginner", "intermediate", "advanced"
  title: text("title").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  options: jsonb("options").notNull(),
  // Array of answer options
  correctOptionId: integer("correct_option_id").notNull(),
  explanation: text("explanation").notNull(),
  funFact: text("fun_fact")
});
var insertQuestionSchema = createInsertSchema(questions).omit({
  id: true
});
var scores = pgTable("scores", {
  id: serial("id").primaryKey(),
  playerName: text("player_name"),
  difficulty: text("difficulty").notNull(),
  score: integer("score").notNull(),
  correctAnswers: integer("correct_answers").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  createdAt: text("created_at").notNull()
  // Store as ISO string
});
var insertScoreSchema = createInsertSchema(scores).omit({
  id: true
});
var questionOptionSchema = z.object({
  id: z.number(),
  text: z.string()
});

// server/routes.ts
import { ZodError } from "zod";
async function registerRoutes(app2) {
  app2.get("/api/questions", async (req, res) => {
    try {
      const difficulty = req.query.difficulty || "beginner";
      const limit = parseInt(req.query.limit || "10");
      const questions2 = await storage.getQuestions(difficulty, limit);
      res.json(questions2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch questions" });
    }
  });
  app2.get("/api/questions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid question ID" });
      }
      const question = await storage.getQuestionById(id);
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
      res.json(question);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch question" });
    }
  });
  app2.get("/api/scores", async (req, res) => {
    try {
      const difficulty = req.query.difficulty || "beginner";
      const limit = parseInt(req.query.limit || "10");
      const scores2 = await storage.getTopScores(difficulty, limit);
      res.json(scores2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch scores" });
    }
  });
  app2.post("/api/scores", async (req, res) => {
    try {
      const scoreData = insertScoreSchema.parse({
        ...req.body,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      });
      const newScore = await storage.createScore(scoreData);
      res.status(201).json(newScore);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid score data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to save score" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var isReplitDev = process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0;
var replitDevPlugins = [];
if (isReplitDev) {
  replitDevPlugins.push(runtimeErrorOverlay());
}
var vite_config_default = defineConfig(async () => {
  const plugins = [
    react()
  ];
  if (isReplitDev) {
    plugins.push(runtimeErrorOverlay());
    const cartographerPlugin = await import("@replit/vite-plugin-cartographer").then((m) => m.cartographer());
    plugins.push(cartographerPlugin);
  }
  return {
    base: "/crochet-quiz-game/",
    // <--- THIS IS THE KEY CHANGE FOR GITHUB PAGES
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "client", "src"),
        "@shared": path.resolve(import.meta.dirname, "shared"),
        "@assets": path.resolve(import.meta.dirname, "attached_assets")
      }
    },
    root: path.resolve(import.meta.dirname, "client"),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist/public"),
      emptyOutDir: true
    }
  };
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
