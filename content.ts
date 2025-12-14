import { ContentData } from './types';

export const contentData: ContentData = {
  "lessons": [
    {
      "id": "intro",
      "title": "Why learn about dyslexia",
      "shortTitle": "Introduction",
      "description": "Discover the 3 key reasons to understand dyslexia and how it benefits everyone.",
      "icon": "Info",
      "blocks": [
        {
          "id": "intro-p1",
          "type": "paragraph",
          "content": "There are many reasons to learn about dyslexia. Here are just three of them."
        },
        {
          "id": "intro-list1",
          "type": "list",
          "ordered": true,
          "items": [
            { "id": "intro-l1-1", "content": "<strong>Help someone with dyslexia</strong> without even realising they are dyslexic by producing more dyslexia-friendly documents" },
            { "id": "intro-l1-2", "content": "<strong>Help yourself</strong> by using some of the <strong>technologies and strategies</strong> for reading and writing that help people with dyslexia - they can improve everyone's writing" },
            { "id": "intro-l1-3", "content": "Produce documents that are easier to read for more people. <strong>Dyslexia-friendly documents are easier to read for everyone.</strong> Dyslexia-friendly documents are also easier to edit." }
          ]
        },
        {
          "id": "intro-box1",
          "type": "box",
          "style": "blue",
          "content": "This page outlines <strong>5 lessons you can learn</strong>. You can read them all at once, or schedule 15 minutes each day for five days to learn a new skill and integrate it into your practice."
        }
      ]
    },
    {
      "id": "day1",
      "title": "About dyslexia and its immediate impacts",
      "shortTitle": "About Dyslexia",
      "description": "Understand dyslexia as a learning difficulty and experience what it feels like.",
      "icon": "Eye",
      "sections": [
        {
          "id": "day1-know",
          "title": "What to know",
          "icon": "Lightbulb",
          "colorClass": "border-amber-400",
          "contentType": "knowledge",
          "blocks": [
            {
              "id": "day1-know-list",
              "type": "list",
              "ordered": true,
              "items": [
                { "id": "day1-k-1", "content": "Dyslexia is a <strong>learning difficulty</strong> that makes it more <strong>challenging to decode letters into words</strong> during reading and to spell words during writing" },
                { "id": "day1-k-2", "content": "Dyslexia is a <strong>hidden disability</strong>. This means that there is nothing that makes someone with dyslexia stand out in daily interactions" },
                { "id": "day1-k-3", "content": "People are <strong>identified as having dyslexia at every stage</strong> of their educational journey as the need to rely on reading increases" },
                { "id": "day1-k-4", "content": "Dyslexia is <strong>not linked to intelligence</strong> or any other quality. People with extremely high or low IQ can have dyslexia. <strong>People with dyslexia can understand the content</strong> of the text but they have to spend so much effort on decoding individual words, they have less left for overall meaning. Many successful academics have dyslexia" },
                { "id": "day1-k-5", "content": "Dyslexia is <strong>a life-long condition</strong>, but it can be mitigated with training and technology." }
              ]
            }
          ]
        },
        {
          "id": "day1-read",
          "title": "What to read",
          "icon": "BookOpen",
          "colorClass": "border-blue-400",
          "contentType": "resource",
          "blocks": [
            {
              "id": "day1-r-1",
              "type": "paragraph",
              "content": "Read the official definition of dyslexia from the Rose report:"
            },
            {
              "id": "day1-r-2",
              "type": "blockquote",
              "content": "'Dyslexia is a learning difficulty that primarily affects the skills involved in accurate and fluent word reading and spelling.'"
            },
            {
              "id": "day1-r-3",
              "type": "paragraph",
              "content": "<a href=\"https://www.bdadyslexia.org.uk/dyslexia/about-dyslexia/what-is-dyslexia\" target=\"_blank\" rel=\"noreferrer\" class=\"text-blue-600 hover:underline font-medium\">What is dyslexia?, British Dyslexia Association (bdadyslexia.org.uk)</a>."
            }
          ]
        },
        {
          "id": "day1-do",
          "title": "What to do",
          "icon": "Keyboard",
          "colorClass": "border-emerald-400",
          "contentType": "activity",
          "blocks": [
            {
              "id": "day1-d-p1",
              "type": "paragraph",
              "content": "<strong>Try these two activities</strong> to see what it might <strong>feel like</strong> to read or write when someone is dyslexic:"
            },
            {
              "id": "day1-d-list1",
              "type": "list",
              "ordered": true,
              "items": [
                { "id": "day1-act-1", "content": "<strong>Read a text in the mirror</strong> or in very tiny font" },
                { "id": "day1-act-2", "content": "<strong>Write out a sentence by hand</strong> but write every a as @ and every e as 3." }
              ]
            },
            {
              "id": "day1-d-p2",
              "type": "paragraph",
              "content": "What <strong>you will experience</strong> is:"
            },
            {
              "id": "day1-d-list2",
              "type": "list",
              "ordered": true,
              "items": [
                { "id": "day1-exp-1", "content": "Your reading and writing will <strong>slow down</strong>" },
                { "id": "day1-exp-2", "content": "You will make <strong>more errors</strong>" },
                { "id": "day1-exp-3", "content": "You will have to <strong>focus so much on individual words</strong> that you will struggle to make sense of the whole." }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "day2",
      "title": "Structured, undistorted text is dyslexia friendly",
      "shortTitle": "Structured Text",
      "description": "Learn how structure helps everyone and 3 easy ways to format your documents.",
      "icon": "Layout",
      "sections": [
        {
          "id": "day2-know",
          "title": "What to know",
          "icon": "Lightbulb",
          "colorClass": "border-amber-400",
          "contentType": "knowledge",
          "blocks": [
            {
              "id": "day2-k-p1",
              "type": "paragraph",
              "content": "Because dyslexia readers often read more slowly, they find it more <strong>difficult to skim or scan a text</strong>. Large chunks of undifferentiated text are very hard to process and may feel intimidating."
            },
            {
              "id": "day2-k-p2",
              "type": "paragraph",
              "content": "<strong>Three easy things</strong> you can do to make text more <strong>dyslexia friendly</strong>:"
            },
            {
              "id": "day2-k-list1",
              "type": "list",
              "ordered": true,
              "items": [
                { "id": "day2-k-1", "content": "<strong>Bold</strong> key phrases in your paragraphs" },
                { "id": "day2-k-2", "content": "Use numbers and <strong>bullets</strong> for <strong>lists</strong>" },
                { "id": "day2-k-3", "content": "Labels sections with <strong>headings</strong> and mark them with <strong>heading styles.</strong>" }
              ]
            }
          ]
        },
        {
          "id": "day2-read",
          "title": "What to read",
          "icon": "BookOpen",
          "colorClass": "border-blue-400",
          "contentType": "resource",
          "blocks": [
            {
              "id": "day2-r-1",
              "type": "paragraph",
              "content": "Read <a href=\"https://readability.edutools.fyi/\" target=\"_blank\" rel=\"noreferrer\" class=\"text-blue-600 hover:underline font-medium\">readability.edutools.fyi</a>."
            }
          ]
        },
        {
          "id": "day2-do",
          "title": "What to do",
          "icon": "Keyboard",
          "colorClass": "border-emerald-400",
          "contentType": "activity",
          "blocks": [
            {
              "id": "day2-d-p1",
              "type": "paragraph",
              "content": "<strong>Review one of your documents</strong> or websites to see how you could make it more dyslexia friendly."
            }
          ]
        }
      ]
    },
    {
      "id": "day3",
      "title": "Listening to text reduces processing overload",
      "shortTitle": "Listening to Text",
      "description": "Reduce processing load by listening to text using modern TTS tools.",
      "icon": "Headphones",
      "sections": [
        {
          "id": "day3-know",
          "title": "What to know",
          "icon": "Lightbulb",
          "colorClass": "border-amber-400",
          "contentType": "knowledge",
          "blocks": [
            {
              "id": "day3-k-p1",
              "type": "paragraph",
              "content": "One way in which a person with dyslexia can <strong>reduce the processing overload</strong> is to <strong>listen</strong> to text."
            },
            {
              "id": "day3-k-p2",
              "type": "paragraph",
              "content": "<strong>Text to speech technology</strong> has improved greatly and is now available to everyone for free."
            }
          ]
        },
        {
          "id": "day3-read",
          "title": "What to read",
          "icon": "BookOpen",
          "colorClass": "border-blue-400",
          "contentType": "resource",
          "blocks": [
            {
              "id": "day3-r-1",
              "type": "paragraph",
              "content": "Read about <strong>how and why to listen</strong> to text at <a href=\"https://academicreading.edutools.fyi/\" target=\"_blank\" rel=\"noreferrer\" class=\"text-blue-600 hover:underline font-medium\">academicreading.edutools.fyi</a>."
            }
          ]
        },
        {
          "id": "day3-do",
          "title": "What to do",
          "icon": "Keyboard",
          "colorClass": "border-emerald-400",
          "contentType": "activity",
          "blocks": [
            {
              "id": "day3-d-p1",
              "type": "paragraph",
              "content": "<strong>Try listening to text:</strong>"
            },
            {
              "id": "day3-d-list1",
              "type": "list",
              "ordered": true,
              "items": [
                { "id": "day3-act-1", "content": "Open a <strong>document or email you wrote</strong> in <strong>Word Online</strong> or on your phone and choose <strong>Read Aloud</strong>" },
                { "id": "day3-act-2", "content": "Open a <strong>webpage or a PDF in Microsoft Edge</strong> and choose <strong>Read Aloud.</strong>" }
              ]
            },
            {
              "id": "day3-d-p2",
              "type": "paragraph",
              "content": "This will <strong>help you</strong> in two ways:"
            },
            {
              "id": "day3-d-list2",
              "type": "list",
              "ordered": true,
              "items": [
                { "id": "day3-exp-1", "content": "You will have a better sense of how people with dyslexia and blind people <strong>experience text</strong>" },
                { "id": "day3-exp-2", "content": "You will be able to <strong>improve your own reading</strong> practices." }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "day4",
      "title": "Dictating instead of writing reduces spelling overhead",
      "shortTitle": "Dictation",
      "description": "Remove the stress of spelling by using free dictation tools.",
      "icon": "Mic",
      "sections": [
        {
          "id": "day4-know",
          "title": "What to know",
          "icon": "Lightbulb",
          "colorClass": "border-amber-400",
          "contentType": "knowledge",
          "blocks": [
            {
              "id": "day4-k-p1",
              "type": "paragraph",
              "content": "<strong>Dictation can help</strong> reduce the stress of spelling for a person with dyslexia."
            },
            {
              "id": "day4-k-p2",
              "type": "paragraph",
              "content": "There are now <strong>many free tools for dictation</strong>."
            }
          ]
        },
        {
          "id": "day4-read",
          "title": "What to read",
          "icon": "BookOpen",
          "colorClass": "border-blue-400",
          "contentType": "resource",
          "blocks": [
            {
              "id": "day4-r-1",
              "type": "paragraph",
              "content": "Read about <strong>why and how to dictate</strong> at <a href=\"https://academicproductivity.edutools.fyi/\" target=\"_blank\" rel=\"noreferrer\" class=\"text-blue-600 hover:underline font-medium\">academicproductivity.edutools.fyi</a>."
            }
          ]
        },
        {
          "id": "day4-do",
          "title": "What to do",
          "icon": "Keyboard",
          "colorClass": "border-emerald-400",
          "contentType": "activity",
          "blocks": [
            {
              "id": "day4-d-list1",
              "type": "list",
              "ordered": true,
              "items": [
                { "id": "day4-act-1", "content": "Open <strong>Word Online</strong> and try dictating a short piece of text" },
                { "id": "day4-act-2", "content": "Think about what <strong>benefits and challenges</strong> a person with dyslexia will face when they use this method" },
                { "id": "day4-act-3", "content": "Think about how you can <strong>use dictation to help you</strong> with your writing." }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "day5",
      "title": "Visual aspects that make reading easier",
      "shortTitle": "Visual Aspects",
      "description": "Fonts, spacing, and colors that help (and what doesn't work).",
      "icon": "Glasses",
      "sections": [
        {
          "id": "day5-know",
          "title": "What to know",
          "icon": "Lightbulb",
          "colorClass": "border-amber-400",
          "contentType": "knowledge",
          "blocks": [
            {
              "id": "day5-k-p1",
              "type": "paragraph",
              "content": "Although <strong>dyslexia is not a visual difficulty</strong>, visual aspects of text can further slow down processing."
            },
            {
              "id": "day5-k-p2",
              "type": "paragraph",
              "content": "The same things that help readers with dyslexia improve the processing for everyone."
            },
            {
              "id": "day5-k-h1",
              "type": "heading",
              "content": "Things that help",
              "icon": "CheckCircle2"
            },
            {
              "id": "day5-k-list1",
              "type": "list",
              "ordered": true,
              "items": [
                { "id": "day5-k-1", "content": "Do use <ol class=\"list-[lower-alpha] pl-5 mt-2 space-y-1\"><li>larger font size</li><li>increased line spacing</li><li>shorter lines.</li></ol>" },
                { "id": "day5-k-2", "content": "Do not use <ol class=\"list-[lower-alpha] pl-5 mt-2 space-y-1\"><li>underline</li><li>italics</li><li>ALL CAPS.</li></ol>" }
              ]
            },
            {
              "id": "day5-k-p3",
              "type": "paragraph",
              "content": "<strong>Warm background colours</strong> (such as light cream) can also help with processing. But in general, it is best not to do this for documents as standard."
            },
            {
              "id": "day5-k-h2",
              "type": "heading",
              "content": "Things that do not help"
            },
            {
              "id": "day5-k-p4",
              "type": "paragraph",
              "content": "Research has shown that two of the most commonly prescribed solutions for dyslexia do not work:"
            },
            {
              "id": "day5-k-list2",
              "type": "list",
              "ordered": true,
              "items": [
                { "id": "day5-k-3", "content": "Dyslexia Font or other special fonts" },
                { "id": "day5-k-4", "content": "Coloured overlays." }
              ]
            },
            {
              "id": "day5-k-p5",
              "type": "paragraph",
              "content": "However, both may be preferred by people with dyslexia or others for a more comfortable reading experience."
            }
          ]
        },
        {
          "id": "day5-read",
          "title": "What to read",
          "icon": "BookOpen",
          "colorClass": "border-blue-400",
          "contentType": "resource",
          "blocks": [
            {
              "id": "day5-r-1",
              "type": "paragraph",
              "content": "Read <a href=\"https://readability.edutools.fyi/\" target=\"_blank\" rel=\"noreferrer\" class=\"text-blue-600 hover:underline font-medium\">readability.edutools.fyi</a>."
            }
          ]
        },
        {
          "id": "day5-do",
          "title": "What to do",
          "icon": "Keyboard",
          "colorClass": "border-emerald-400",
          "contentType": "activity",
          "blocks": [
            {
              "id": "day5-d-list1",
              "type": "list",
              "ordered": true,
              "items": [
                { "id": "day5-act-1", "content": "<strong>Review one of your documents</strong> or websites to see how you could make it more dyslexia friendly." },
                { "id": "day5-act-2", "content": "Learn to <strong>enlarge documents</strong> you are reading" },
                { "id": "day5-act-3", "content": "<strong>Change the background colour</strong> on your reader software to reduce visual stress." }
              ]
            }
          ]
        }
      ]
    }
  ]
};