/* Kartikk Pandit — Portfolio interactions. Vanilla JS, no dependencies. */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----- Mobile nav ----- */
  var toggle = document.getElementById('navToggle');
  var panel = document.getElementById('navLinks');
  if (toggle && panel) {
    toggle.addEventListener('click', function () {
      var open = panel.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    panel.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        panel.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ----- Scroll reveal ----- */
  var revealTargets = document.querySelectorAll('.sec-head, .about-body, .beliefs, .pillar, .tl-item, .case, .flow, .tk-group, .rec, .post, .contact-copy');
  revealTargets.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('in'); });
  }

  /* ----- Scroll spy (active nav link) ----- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  var sections = links
    .map(function (l) { return document.querySelector(l.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var id = e.target.getAttribute('id');
          links.forEach(function (l) {
            l.classList.toggle('active', l.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ----- Intro: one random recommendation snippet per page load ----- */
  var introQuote = document.getElementById('introQuote');
  if (introQuote) {
    var quotes = [
      { t: '“Aligns cross-functional teams toward a common vision.”', b: 'Apoorv Goyal · Senior Software Engineer at Deel' },
      { t: '“Connects business needs, system design, and user experience.”', b: 'Ajay Antony Naveen · Backend Engineer at Oro' },
      { t: '“Bridged the gap between the tech team and the product team.”', b: 'Dhruv Bhatnagar · Founding Engineer at Maximor AI' },
      { t: '“A calm energy that steadies the room.”', b: 'Udit Namdev · SDE II at Amazon' },
      { t: '“One of the most thoughtful, strategic PMs I have met.”', b: 'Manikandan Arumugam · Implementation Engineer at Clear Touch Connect' },
      { t: '“A constant source of clarity in my founder journey.”', b: 'Shantanu Hadge · Founder & CEO of Jenovate AI' },
      { t: '“Excellent product sense, and he articulates complexity with clarity.”', b: 'Suresh Harikrishnan · Co-founder & CEO of Peach AI' },
      { t: '“He defines the why and the what, then shapes the how.”', b: 'Mayank Nauriyal · Engineering Manager at Skeps' },
      { t: '“Developers need minimal hand-holding when he is on it.”', b: 'Shubham Bansal · Software Engineer at Kiwi' },
      { t: '“He made us look at the problem in a completely different way.”', b: 'Ruddhita Chandak · Loan Operations Manager at Oro' },
      { t: '“He guided the whole team like a mentor, start to finish.”', b: 'Gaurav Mishra · Frontend Engineer at Factors.ai' },
      { t: '“His internal tools were crucial to our growth and scalability.”', b: 'Sachin Kumar · Engineering Manager at Oro' },
      { t: '“Calm and focused, even on the most complex products.”', b: 'Pragadeesh N · Product Manager at Oro' },
      { t: '“Reliable and thoughtful. He asks the right questions.”', b: 'Girish Baranda · Engineering Leader at Oro' },
      { t: '“Strategic, composed, and always sees the bigger picture.”', b: 'Siddharth Mittal · Engineer at Deel' },
      { t: '“He deeply understands both the user and the technical side of a product.”', b: 'Sanyog Ghosh · Engineer at Deel' }
    ];
    var q = quotes[Math.floor(Math.random() * quotes.length)];
    introQuote.querySelector('.iq-text').textContent = q.t;
    introQuote.querySelector('.iq-by').textContent = q.b;
  }

  /* Click anywhere (or the Enter button) to enter early; CSS auto-advances as a safety net. */
  var intro = document.querySelector('.intro');
  if (intro) {
    intro.addEventListener('click', function () { intro.classList.add('entered'); });
  }

  /* ----- Count-up on metrics tagged with data-count ----- */
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && !reduce && counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        cio.unobserve(e.target);
        var el = e.target;
        var raw = el.getAttribute('data-count');
        var end = parseFloat(raw);
        var dec = (raw.split('.')[1] || '').length;
        var suffix = el.getAttribute('data-suffix') || '';
        var start = performance.now();
        var dur = 1200;
        function frame(t) {
          var p = Math.min((t - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          var val = end * eased;
          el.textContent = (dec ? val.toFixed(dec) : Math.round(val)) + suffix;
          if (p < 1) requestAnimationFrame(frame);
          else el.textContent = (dec ? end.toFixed(dec) : end) + suffix;
        }
        requestAnimationFrame(frame);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { cio.observe(c); });
  }
})();
