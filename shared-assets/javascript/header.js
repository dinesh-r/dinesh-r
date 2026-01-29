function initHeaderLogic() {

  // Hamburger animation and state management
  const toggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.getElementById('navbarNav');
  
  if (toggler && navbarCollapse) {
    toggler.addEventListener("click", function () {
      this.classList.toggle("active");
      
      // Sync aria-expanded with the actual state after Bootstrap finishes
      setTimeout(() => {
        const isExpanded = navbarCollapse.classList.contains('show');
        this.setAttribute('aria-expanded', isExpanded.toString());
        
        // Announce to screen readers
        const announcer = document.getElementById('navAnnouncer');
        if (announcer) {
          announcer.textContent = isExpanded ? 'Navigation menu expanded' : 'Navigation menu collapsed';
        }
      }, 50);
    });
    
    // Listen for Bootstrap collapse events (more reliable)
    navbarCollapse.addEventListener('shown.bs.collapse', function() {
      toggler.setAttribute('aria-expanded', 'true');
      toggler.classList.add('active');
    });
    
    navbarCollapse.addEventListener('hidden.bs.collapse', function() {
      toggler.setAttribute('aria-expanded', 'false');
      toggler.classList.remove('active');
    });
  }

  // Get current page name only
  const currentPage = window.location.pathname.split('/').pop().toLowerCase();

  // Active menu - FIXED for Bootstrap dropdown structure
  document.querySelectorAll('.navbar-nav .nav-link, .dropdown-item').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    const page = href.split('/').pop().toLowerCase();

    if (page === currentPage) {
      link.classList.add('active');
      // Add aria-current for screen readers - WCAG 2.4.8
      link.setAttribute('aria-current', 'page');

      // Check if this link is inside a dropdown menu
      const dropdownMenu = link.closest('.dropdown-menu');
      
      if (dropdownMenu) {
        // The parent structure is: li.nav-item.dropdown > [a.dropdown-toggle + ul.dropdown-menu]
        // So we need to go up from .dropdown-menu to its parent .nav-item.dropdown
        const parentNavItem = dropdownMenu.parentElement;
        
        if (parentNavItem && parentNavItem.classList.contains('nav-item')) {
          const parentToggle = parentNavItem.querySelector('.dropdown-toggle');
          
          if (parentToggle) {
            parentToggle.classList.add('active');
            parentToggle.setAttribute('data-has-active-child', 'true');
          }
        }
      }
    }
  });

  // ===== ACCESSIBLE DROPDOWN BEHAVIOR =====
  const dropdowns = document.querySelectorAll('.nav-item.dropdown');
  const announcer = document.getElementById('navAnnouncer');
  
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');
    const menuItems = menu.querySelectorAll('.dropdown-item');
    
    // Check if desktop view (>= 1200px)
    function isDesktop() {
      return window.innerWidth >= 1200;
    }
    
    // Announce state changes to screen readers
    function announce(message) {
      if (announcer) {
        announcer.textContent = message;
      }
    }
    
    // HOVER behavior for DESKTOP only
    dropdown.addEventListener('mouseenter', function() {
      if (isDesktop()) {
        openDropdown();
      }
    });
    
    dropdown.addEventListener('mouseleave', function() {
      if (isDesktop()) {
        closeDropdown();
      }
    });
    
    // CLICK behavior
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      
      if (isExpanded) {
        closeDropdown();
      } else {
        // Close other dropdowns first
        dropdowns.forEach(otherDropdown => {
          if (otherDropdown !== dropdown) {
            const otherToggle = otherDropdown.querySelector('.dropdown-toggle');
            const otherMenu = otherDropdown.querySelector('.dropdown-menu');
            closeOtherDropdown(otherDropdown, otherMenu, otherToggle);
          }
        });
        
        openDropdown();
      }
    });
    
    // KEYBOARD navigation - WCAG 2.1.1 compliant
    toggle.addEventListener('keydown', function(e) {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      
      switch(e.key) {
        case 'ArrowDown':
        case 'Down': // IE/Edge support
          e.preventDefault();
          if (!isExpanded) {
            openDropdown();
          }
          // Focus first menu item
          menuItems[0]?.focus();
          break;
          
        case 'ArrowUp':
        case 'Up': // IE/Edge support
          e.preventDefault();
          if (isExpanded) {
            // Focus last menu item
            menuItems[menuItems.length - 1]?.focus();
          }
          break;
          
        case 'Enter':
        case ' ':
        case 'Spacebar': // IE/Edge support
          e.preventDefault();
          if (isExpanded) {
            closeDropdown();
          } else {
            openDropdown();
            menuItems[0]?.focus();
          }
          break;
          
        case 'Escape':
        case 'Esc': // IE/Edge support
          e.preventDefault();
          if (isExpanded) {
            closeDropdown();
            toggle.focus();
          }
          break;
          
        case 'Tab':
          // Allow natural tab flow - skip dropdown items
          if (isExpanded && !e.shiftKey) {
            closeDropdown();
          }
          break;
      }
    });
    
    // Handle keyboard navigation within dropdown items
    menuItems.forEach((item, index) => {
      item.addEventListener('keydown', function(e) {
        switch(e.key) {
          case 'ArrowDown':
          case 'Down':
            e.preventDefault();
            const nextItem = menuItems[index + 1] || menuItems[0];
            nextItem.focus();
            break;
            
          case 'ArrowUp':
          case 'Up':
            e.preventDefault();
            if (index === 0) {
              toggle.focus();
            } else {
              menuItems[index - 1].focus();
            }
            break;
            
          case 'Home':
            e.preventDefault();
            menuItems[0].focus();
            break;
            
          case 'End':
            e.preventDefault();
            menuItems[menuItems.length - 1].focus();
            break;
            
          case 'Escape':
          case 'Esc':
            e.preventDefault();
            closeDropdown();
            toggle.focus();
            break;
            
          case 'Tab':
            if (!e.shiftKey && index === menuItems.length - 1) {
              // Last item - close and continue
              closeDropdown();
            } else if (e.shiftKey && index === 0) {
              // First item with shift+tab - close and go back
              closeDropdown();
            }
            break;
        }
      });
    });
    
    // Close dropdown when focus leaves completely
    dropdown.addEventListener('focusout', function(e) {
      setTimeout(() => {
        if (!dropdown.contains(document.activeElement)) {
          closeDropdown();
        }
      }, 100);
    });
    
    // Helper functions
    function openDropdown() {
      dropdown.classList.add('show');
      menu.classList.add('show');
      toggle.setAttribute('aria-expanded', 'true');
      
      // Make menu items focusable when menu is open
      menuItems.forEach(item => item.setAttribute('tabindex', '0'));
      
      // Announce to screen readers
      const menuName = toggle.textContent.trim();
      announce(`${menuName} submenu expanded`);
    }
    
    function closeDropdown() {
      dropdown.classList.remove('show');
      menu.classList.remove('show');
      toggle.setAttribute('aria-expanded', 'false');
      
      // Remove menu items from tab order when closed
      menuItems.forEach(item => item.setAttribute('tabindex', '-1'));
      
      // Announce to screen readers
      const menuName = toggle.textContent.trim();
      announce(`${menuName} submenu collapsed`);
    }
    
    function closeOtherDropdown(otherDropdown, otherMenu, otherToggle) {
      const otherItems = otherMenu.querySelectorAll('.dropdown-item');
      otherDropdown.classList.remove('show');
      otherMenu.classList.remove('show');
      otherToggle.setAttribute('aria-expanded', 'false');
      otherItems.forEach(item => item.setAttribute('tabindex', '-1'));
    }
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    dropdowns.forEach(dropdown => {
      if (!dropdown.contains(e.target)) {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        const menuItems = menu.querySelectorAll('.dropdown-item');
        
        dropdown.classList.remove('show');
        menu.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
        menuItems.forEach(item => item.setAttribute('tabindex', '-1'));
      }
    });
  });
  
  // FIXED: Handle window resize - close dropdowns AND mobile menu
  let resizeTimer;
  let previousWidth = window.innerWidth;
  
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      const currentWidth = window.innerWidth;
      
      // Check if we crossed the mobile/desktop breakpoint (1200px)
      const wasDesktop = previousWidth >= 1200;
      const isDesktop = currentWidth >= 1200;
      
      // Close all dropdowns on any resize
      dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        const menuItems = menu.querySelectorAll('.dropdown-item');
        
        dropdown.classList.remove('show');
        menu.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
        menuItems.forEach(item => item.setAttribute('tabindex', '-1'));
      });
      
      // If transitioning from mobile to desktop, force close mobile menu
      if (!wasDesktop && isDesktop) {
        const navbarCollapse = document.getElementById('navbarNav');
        const navbarToggler = document.querySelector('.navbar-toggler');
        
        if (navbarCollapse) {
          // Force remove Bootstrap classes
          navbarCollapse.classList.remove('show', 'collapsing');
          navbarCollapse.style.removeProperty('height');
          
          // Reset hamburger icon
          if (navbarToggler) {
            navbarToggler.classList.remove('active');
            navbarToggler.setAttribute('aria-expanded', 'false');
          }
          
          // Announce to screen readers
          if (announcer) {
            announcer.textContent = 'Navigation menu closed';
          }
        }
      }
      
      // Update previous width for next comparison
      previousWidth = currentWidth;
    }, 150); // Reduced delay for faster response
  });
}


(function () {
    const path = window.location.pathname.toLowerCase();
    const parts = path.split('/');

    const states = ["co", "tx"];

    if (states.includes(parts[1])) {
        localStorage.setItem("state", parts[1]);
    }
})();

document.addEventListener("DOMContentLoaded", function () {

    const params = new URLSearchParams(window.location.search);
    let state = params.get("state");

    if (!state) {
        state = localStorage.getItem("state");
    }

    if (!state) {
        state = window.location.pathname.split('/')[1];
    }

    if (!state) state = "co";

    console.log("STATE =", state);

    const headerPath = `/component/header-${state}.html`;
    const footerPath = `/component/footer-${state}.html`;

    fetch(headerPath)
        .then(res => res.text())
        .then(data => {
            document.getElementById("header").innerHTML = data;
            initHeaderLogic();
            document.body.classList.add("loaded");
        });

    fetch(footerPath)
        .then(res => res.text())
        .then(data => {
            document.getElementById("footer").innerHTML = data;
        });
});