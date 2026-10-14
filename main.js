/**
 * NATHAN ASSOCIATES - Core Client-Side Logic
 * - Header scroll state
 * - Mobile drawer interaction
 * - Service category filtering
 * - Interactive Project Scope & Documentation Planner (Live Thing)
 * - Project photo modal
 * - Inquiry form handling
 * - Scroll entrance animations
 */

const initApp = () => {
  // 1. Header scroll state
  const header = document.querySelector('.site-header');
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header?.classList.add('is-scrolled');
    } else {
      header?.classList.remove('is-scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile navigation drawer
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-list .nav-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('is-open');
      if (isOpen) {
        mobileDrawer.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      } else {
        mobileDrawer.classList.add('is-open');
        mobileToggle.setAttribute('aria-expanded', 'true');
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && mobileDrawer.classList.contains('is-open')) {
        mobileDrawer.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 3. Service Catalog Filtering & Expand/Collapse
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');
  const expandBtn = document.getElementById('btn-services-expand');
  const toggleContainer = document.querySelector('.services-toggle-container');
  const toggleBtnText = expandBtn?.querySelector('.toggle-btn-text');

  const INITIAL_LIMIT = 6;
  let isExpanded = false;
  let activeFilter = 'all';

  const updateServiceCards = () => {
    let visibleCountInFilter = 0;

    serviceCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const matchesFilter = (activeFilter === 'all' || category === activeFilter);

      if (!matchesFilter) {
        card.style.display = 'none';
      } else {
        visibleCountInFilter++;
        if (activeFilter === 'all' && !isExpanded && visibleCountInFilter > INITIAL_LIMIT) {
          card.style.display = 'none';
        } else {
          card.style.display = 'flex';
        }
      }
    });

    if (toggleContainer && expandBtn) {
      if (activeFilter === 'all') {
        toggleContainer.style.display = 'flex';
        expandBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
        if (toggleBtnText) {
          toggleBtnText.textContent = isExpanded ? 'Show Fewer Capabilities' : 'View All 39 Capabilities';
        }
      } else {
        // When filtered by specific category, show all matching cards directly
        toggleContainer.style.display = 'none';
      }
    }
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      activeFilter = btn.getAttribute('data-filter') || 'all';
      updateServiceCards();
    });
  });

  if (expandBtn) {
    expandBtn.addEventListener('click', () => {
      isExpanded = !isExpanded;
      updateServiceCards();

      if (!isExpanded) {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  }

  updateServiceCards();

  // 4. Interactive Project Scope Planner (The Live Thing)
  const plannerDiscipline = document.getElementById('planner-discipline');
  const plannerType = document.getElementById('planner-type');
  const plannerScale = document.getElementById('planner-scale');
  const plannerLocation = document.getElementById('planner-location');

  const outputTitle = document.getElementById('planner-output-title');
  const outputMethodology = document.getElementById('planner-output-methodology');
  const outputRoadmap = document.getElementById('planner-output-roadmap');
  const outputDeliverables = document.getElementById('planner-output-deliverables');
  const outputTimeline = document.getElementById('planner-output-timeline');
  const whatsappBtn = document.getElementById('planner-whatsapp-btn');
  const callBtn = document.getElementById('planner-call-btn');

  const updatePlanner = () => {
    if (!plannerDiscipline || !plannerType) return;

    const discipline = plannerDiscipline.value;
    const propertyType = plannerType.value;
    const scale = plannerScale.value;
    const location = plannerLocation.value;

    let title = "Standard Survey Specification";
    let methodology = "Dual-Frequency DGPS Network + Electronic Total Station";
    let roadmap = "Revenue FMB Verification and Boundary Pegging";
    let deliverables = [
      "Geo-referenced CAD Drawing (.DWG & .DXF)",
      "Boundary Coordinate Schedule (UTM WGS84)",
      "High-Precision Spot Level Table",
      "Certified Field Inspection Report"
    ];
    let timeline = "2 to 3 Business Days for Field Survey & Drawing Delivery";

    if (discipline === 'survey') {
      if (propertyType === 'layout' || propertyType === 'acreage') {
        title = "Topographical & Cadastral Boundary Survey";
        methodology = "Dual-Frequency RTK DGPS + Total Station Boundary Pegging";
        roadmap = "Comparison against Village FMB and Revenue Taluk Records";
        deliverables = [
          "Cadastral Overlay CAD Drawing",
          "Topographical Contour Map (0.5m intervals)",
          "Boundary Pegging & Setting-out Schedule",
          "Area Statement & Boundary Certification"
        ];
        timeline = scale === 'estate' ? "4 to 6 Working Days" : "2 to 3 Working Days";
      } else if (propertyType === 'corridor') {
        title = "Linear Alignment & Pipeline Survey";
        methodology = "Differential GPS Traverse + Drone Aerial Photogrammetry";
        roadmap = "Right-of-Way (RoW) Demarcation & Utility Corridor Identification";
        deliverables = [
          "Linear Centerline Profile & Cross Sections",
          "Digital Terrain Model (DTM)",
          "Ground Elevation Grid",
          "Obstacle & Crossing Location Registry"
        ];
        timeline = "3 to 5 Working Days depending on length";
      } else if (propertyType === 'industrial') {
        title = "Industrial Grade Layout & Foundation Marking";
        methodology = "High-Accuracy Total Station + Machine Bed Bolt Alignment";
        roadmap = "Factory Building Plan Alignment with Ground Benchmarks";
        deliverables = [
          "Column Centerline Grid Layout",
          "Bed Bolt Setting-out Coordinate Sheet",
          "Finished Floor Level (FFL) Transfer Markers",
          "As-Built Verification Drawing"
        ];
        timeline = "1 to 3 Working Days";
      }
    } else if (discipline === 'approvals') {
      if (propertyType === 'layout' || propertyType === 'acreage') {
        title = "DTCP / RERA Layout & Sub-Division Approval";
        methodology = "Comprehensive Planning Authority Filing & Cadastral Compilation";
        roadmap = "Directorate of Town and Country Planning (DTCP) Technical Sanction";
        deliverables = [
          "Sanctioned Layout Plan with Plot Dimensions",
          "Road Width & Open Space Reservation (OSR) Clearance",
          "Taluk Tahsildar / Revenue Verification Records",
          "RERA Project Registration Documentation"
        ];
        timeline = "Structured clearance timeline following government review cycles";
      } else if (propertyType === 'commercial' || propertyType === 'industrial') {
        title = "Commercial / Industrial Building Plan Sanction";
        methodology = "Municipal Corporation / Directorate Technical Scrutiny";
        roadmap = "Structural Stability, Fire NOC, and Environmental Zone Compliance";
        deliverables = [
          "Sanctioned Architectural Working Drawings",
          "NOC Dossiers for Waterway/Highway/EB Proximity",
          "Local Body Building Permit",
          "Industrial Land Conversion Sanction Order"
        ];
        timeline = "Phased regulatory milestone schedule";
      } else {
        title = "Panchayat & Corporation Plot Regularisation";
        methodology = "Scheme Application Structuring & Existing Survey Verification";
        roadmap = "Government Regularisation Order Compliance for Individual Plots";
        deliverables = [
          "Individual Regularisation Certificate",
          "Approved Site Dimension Drawing",
          "Revenue Sub-Division Record",
          "Patta Transfer Support Dossier"
        ];
        timeline = "15 to 30 Days under active government window";
      }
    } else if (discipline === 'consultancy') {
      title = "Engineering Investigation & Structural Design";
      methodology = "Subsurface Geotechnical Testing (SPT / ERT) + BIM Design";
      roadmap = "Soil Bearing Capacity Analysis and Foundation Recommendation";
      deliverables = [
        "Geotechnical Soil Investigation Report with Safe Bearing Capacity (SBC)",
        "Groundwater Potential & Resistivity Survey",
        "2D Architectural & 3D Structural Engineering Drawings",
        "Quantity Survey & Bill of Quantities (BOQ)"
      ];
      timeline = "3 to 7 Working Days for Soil Testing & Engineering Drafting";
    }

    if (outputTitle) outputTitle.textContent = title;
    if (outputMethodology) outputMethodology.textContent = methodology;
    if (outputRoadmap) outputRoadmap.textContent = roadmap;
    if (outputTimeline) outputTimeline.textContent = timeline;

    if (outputDeliverables) {
      outputDeliverables.innerHTML = '';
      deliverables.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        outputDeliverables.appendChild(li);
      });
    }

    // Build pre-composed WhatsApp message
    const msg = encodeURIComponent(
      `Hello Nathan Associates,\n\nI would like an enquiry for:\n- Discipline: ${discipline.toUpperCase()}\n- Property: ${propertyType}\n- Scale: ${scale}\n- Location: ${location}\n- Proposed Requirement: ${title}\n\nPlease let me know the technical timeline and fee estimate.`
    );

    if (whatsappBtn) {
      whatsappBtn.href = `https://wa.me/919787240999?text=${msg}`;
    }
  };

  [plannerDiscipline, plannerType, plannerScale, plannerLocation].forEach(el => {
    el?.addEventListener('change', updatePlanner);
  });
  updatePlanner();

  // 5. Project Image Modal Lightbox
  const projectItems = document.querySelectorAll('.project-item');
  const modalBackdrop = document.querySelector('.modal-backdrop');
  const modalImage = document.querySelector('.modal-image-display');
  const modalCaption = document.querySelector('.modal-caption-text');
  const modalClose = document.querySelector('.modal-close-trigger');

  if (modalBackdrop && modalImage && modalClose) {
    projectItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.querySelector('.project-overlay-title')?.textContent || 'Nathan Associates Project';
        const category = item.querySelector('.project-overlay-category')?.textContent || 'Site Verification';

        if (img) {
          modalImage.src = img.src;
          modalImage.alt = img.alt || title;
          if (modalCaption) {
            modalCaption.textContent = `${category}: ${title}`;
          }
          modalBackdrop.classList.add('is-active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeModal = () => {
      modalBackdrop.classList.remove('is-active');
      document.body.style.overflow = '';
    };

    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('is-active')) {
        closeModal();
      }
    });
  }

  // 6. Direct Contact Form (Validated Client-Side, Pre-fills email/WhatsApp)
  const contactForm = document.getElementById('project-contact-form');
  const formStatus = document.getElementById('form-status-msg');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name')?.value.trim();
      const phone = document.getElementById('form-phone')?.value.trim();
      const email = document.getElementById('form-email')?.value.trim();
      const service = document.getElementById('form-service')?.value;
      const details = document.getElementById('form-details')?.value.trim();

      if (!name || !phone) {
        alert('Please provide your name and contact phone number.');
        return;
      }

      const subject = encodeURIComponent(`Project Enquiry: ${service} - ${name}`);
      const body = encodeURIComponent(
        `Client Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nRequested Service: ${service}\n\nProject Details:\n${details}`
      );

      // Open user's email client
      window.location.href = `mailto:info@nathanassociates.in?subject=${subject}&body=${body}`;

      if (formStatus) {
        formStatus.textContent = "Thank you. Your enquiry draft has been prepared. We look forward to reviewing your site details.";
        formStatus.classList.add('is-success');
      }

      contactForm.reset();
    });
  }

  // 7. Scroll Entrance Reveals
  const revealElements = document.querySelectorAll('.reveal-entry');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.02,
      rootMargin: '0px 0px 60px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
