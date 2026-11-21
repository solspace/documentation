import { useEffect, useId, useRef, useState } from 'react';
import styles from './intro.module.css';

const featuredReview = {
  author: 'Brandon Kelly',
  quote: 'Extremely rich feature set, and a long history of being well-maintained and supported.',
};

const reviewColumns = [
  [{
    author: 'Clinton',
    quote: 'Freeform is an invaluable tool for our web company! It offers all the fields we need, from step forms to custom error messages. The flexibility and ease of use have made it a key component in our projects. Highly recommended!',
  }],
  [
    { author: 'Peter Mitchell', quote: 'Flexible, client friendly, well documented.' },
    { author: 'Erika G', quote: 'My go-to form builder for years now. A lot of features and great support.' },
  ],
  [{
    author: 'sunscreem',
    quote: 'Very happy with the Freeform plugin, used it on several client sites now and, despite some customisation, never had an issue. Worth every penny.',
  }],
  [{
    author: 'Matan Levkowich',
    quote: 'Great plugin over all. I use it on my own website and client website. I recently started to use the Stripe integration as well, and it is very smooth and comfortable. Besides that, the support is awesome, quick and personal!',
  }],
  [{
    author: 'Marcus Trapp',
    quote: "Remarkably comprehensive form system with top-notch user interface, developer documentation, and support! I've used this product since its early versions; It started strong and continues to evolve and improve on all fronts. I'm specifically pleased with its Stripe integration, though it offers plenty of other features. Plus, support has been attentive and helpful when I've run into any hitches.",
  }],
  [{
    author: 'Todd Richards',
    quote: "Freeform is a very powerful form builder with options based on your needs. I've used it on a number of projects over the past few years because it just works, and our clients love it. Support is top-notch too!",
  }],
  [{
    author: 'Doing Stuff',
    quote: "There are very few sites that I don't use Freeform on! It's got great flexibility, while being easier enough for clients to use without needing loads of training. It's extendable, and has a lot of integrations... but more than all it's features, it gets 5 stars because it's backed by the team at Solspace who are responsive, caring and look after us.",
  }],
  [{
    author: 'Steven Grant',
    quote: 'If you need forms with a bunch of different integrations and great support to boot, Solspace Freeform is it. Built on decades of experience with CMS forms, Freeform does everything you need.',
  }],
];

function scrollReviews(list: HTMLUListElement, count: number) {
  const [first, second] = Array.from(list.children);
  if (!first || !second) return;

  const distance = second.getBoundingClientRect().left - first.getBoundingClientRect().left;
  list.scrollBy({ left: count * distance });
}

function ReviewQuote({ author, quote }: { author: string; quote: string }) {
  return (
    <figure>
      <span className={styles.reviewStars} role="img" aria-label="5 out of 5 stars">★★★★★</span>
      <blockquote>“{quote}”</blockquote>
      <figcaption><span aria-hidden="true">-</span> {author}</figcaption>
    </figure>
  );
}

export default function OverviewReviews() {
  const rail = useRef<HTMLUListElement>(null);
  const railId = useId();
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const list = rail.current;
    if (!list) return;

    function updateControls() {
      setAtStart(list.scrollLeft <= 1);
      setAtEnd(list.scrollWidth - list.clientWidth - list.scrollLeft <= 1);
    }

    updateControls();
    list.addEventListener('scroll', updateControls, { passive: true });
    const observer = new ResizeObserver(updateControls);
    observer.observe(list);

    return () => {
      list.removeEventListener('scroll', updateControls);
      observer.disconnect();
    };
  }, []);

  function step(direction: -1 | 1) {
    if (rail.current) scrollReviews(rail.current, direction);
  }

  return (
    <section id="reviews" className={styles.reviews} aria-labelledby="reviews-heading">
      <h2 id="reviews-heading" className="sr-only">What Craft developers say</h2>
      <div className={styles.reviewLayout}>
        <div className={styles.featuredReview}>
          <ReviewQuote {...featuredReview} />
        </div>
        <ul ref={rail} id={railId} className={styles.reviewRail} aria-label="More customer reviews" tabIndex={0}>
          {reviewColumns.map(column => (
            <li key={column[0].author}>
              {column.map(review => <ReviewQuote key={review.author} {...review} />)}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.reviewControls}>
        <button type="button" aria-label="Previous review" aria-controls={railId} disabled={atStart} onClick={() => step(-1)}>
          <span aria-hidden="true">←</span>
        </button>
        <button type="button" aria-label="Next review" aria-controls={railId} disabled={atEnd} onClick={() => step(1)}>
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}
