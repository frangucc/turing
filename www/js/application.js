if (device.desktop()) {
  window.Franchino = angular.module('Franchino', ['ngSanitize', 'ui.router', 'btford.socket-io', 'tap.controllers', 'tap.directives']);
} else {
  window.Franchino = angular.module("Franchino", ["ionic", "btford.socket-io", "tap.controllers", 'tap.directives']).run(function($ionicPlatform) {
    return $ionicPlatform.ready(function() {
      if (window.StatusBar) {
        return StatusBar.styleDefault();
      }
    });
  });
}

Franchino.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
  $stateProvider.state('app', {
    url: '',
    abstract: true,
    controller: 'AppCtrl',
    templateUrl: 'menu.html'
  }).state('app.home', {
    url: '/',
    views: {
      menuContent: {
        controller: 'HomeCtrl',
        templateUrl: 'home.html'
      }
    }
  }).state('app.docs', {
    url: '/docs',
    views: {
      menuContent: {
        controller: 'DocsCtrl',
        templateUrl: 'docs/index.html'
      }
    }
  }).state('app.about', {
    url: '/about',
    views: {
      menuContent: {
        controller: 'AboutCtrl',
        templateUrl: 'about.html'
      }
    }
  }).state('app.blog', {
    url: '/blog',
    views: {
      menuContent: {
        controller: 'BlogCtrl',
        templateUrl: 'blog.html'
      }
    }
  }).state('app.resume', {
    url: '/resume',
    views: {
      menuContent: {
        controller: 'ResumeCtrl',
        templateUrl: 'resume.html'
      }
    }
  }).state('app.contact', {
    url: '/contact',
    views: {
      menuContent: {
        controller: 'ContactCtrl',
        templateUrl: 'contact.html'
      }
    }
  }).state('app.doc', {
    url: '/docs/:permalink',
    views: {
      menuContent: {
        controller: 'DocCtrl',
        templateUrl: 'docs/show.html'
      }
    }
  }).state('app.step', {
    url: '/docs/:permalink/:step',
    views: {
      menuContent: {
        controller: 'DocCtrl',
        templateUrl: 'docs/show.html'
      }
    }
  }).state('app.job-tapcentive', {
    url: '/job-tapcentive',
    views: {
      menuContent: {
        controller: 'JobTapcentiveCtrl',
        templateUrl: 'job-tapcentive.html'
      }
    }
  }).state('app.job-tapcentive-two', {
    url: '/job-tapcentive-two',
    views: {
      menuContent: {
        controller: 'JobTapcentiveTwoCtrl',
        templateUrl: 'job-tapcentive-two.html'
      }
    }
  }).state('app.job-cpgio', {
    url: '/job-cpgio',
    views: {
      menuContent: {
        controller: 'JobCpgioCtrl',
        templateUrl: 'job-cpgio.html'
      }
    }
  }).state('app.job-medycation', {
    url: '/job-medycation',
    views: {
      menuContent: {
        controller: 'JobMedycationCtrl',
        templateUrl: 'job-medycation.html'
      }
    }
  }).state('app.job-cst', {
    url: '/job-cst',
    views: {
      menuContent: {
        controller: 'JobCstCtrl',
        templateUrl: 'job-cst.html'
      }
    }
  }).state('app.job-koupn', {
    url: '/job-koupn',
    views: {
      menuContent: {
        controller: 'JobKoupnCtrl',
        templateUrl: 'job-koupn.html'
      }
    }
  }).state('app.job-tround', {
    url: '/job-tround',
    views: {
      menuContent: {
        controller: 'JobTroundCtrl',
        templateUrl: 'job-tround.html'
      }
    }
  }).state('app.job-monthlys', {
    url: '/job-monthlys',
    views: {
      menuContent: {
        controller: 'JobMonthlysCtrl',
        templateUrl: 'job-monthlys.html'
      }
    }
  }).state('app.job-monthlys-two', {
    url: '/job-monthlys-two',
    views: {
      menuContent: {
        controller: 'JobMonthlysTwoCtrl',
        templateUrl: 'job-monthlys-two.html'
      }
    }
  }).state('app.job-benchprep', {
    url: '/job-benchprep',
    views: {
      menuContent: {
        controller: 'JobBenchprepCtrl',
        templateUrl: 'job-benchprep.html'
      }
    }
  });
  $urlRouterProvider.otherwise("/");
  return $httpProvider.interceptors.push(function() {
    return {
      request: function(config) {
        var type;
        if (config.url.match(/\.html$/) && !config.url.match(/^shared\//)) {
          if (device.tablet()) {
            type = 'tablet';
          } else if (device.mobile()) {
            type = 'mobile';
          } else {
            type = 'desktop';
          }
          config.url = "/" + type + "/" + config.url;
        }
        return config;
      }
    };
  });
});

Franchino.run(function($state) {
  return $state.go('app.home');
});

Franchino.run(function($rootScope, copy) {
  return $rootScope.copy = copy;
});

Franchino.factory('Socket', function(socketFactory) {
  return socketFactory();
});

Franchino.factory('Docs', function(Socket) {
  var service;
  service = {
    list: [],
    find: function(permalink) {
      return _.find(service.list, function(doc) {
        return doc.permalink === permalink;
      });
    }
  };
  Socket.on('docs', function(docs) {
    return service.list = docs;
  });
  return service;
});

Franchino.controller('HomeCtrl', function($scope) {});

Franchino.controller('ContactSheetCtrl', function($scope, $ionicActionSheet) {
  $scope.showActionsheet = function() {
    return $ionicActionSheet.show({
      titleText: "Contact Franchino",
      buttons: [
        {
          text: "Github <i class=\"icon ion-share\"></i>"
        }, {
          text: "Email Me <i class=\"icon ion-email\"></i>"
        }, {
          text: "Twitter <i class=\"icon ion-social-twitter\"></i>"
        }, {
          text: "224-241-9189 <i class=\"icon ion-ios-telephone\"></i>"
        }
      ],
      cancelText: "Cancel",
      cancel: function() {
        console.log("CANCELLED");
      },
      buttonClicked: function(index) {
        if (index === 2) {
          window.location.href = "224-241-9189";
        }
        if (index === 2) {
          window.location.href = "http://twitter.com/franchino_che";
        }
        if (index === 1) {
          window.location.href = "mailto:franchino.nonce@gmail.com";
        }
        if (index === 0) {
          window.location.href = "http://github.com/frangucc";
        }
        return true;
      }
    });
  };
});

Franchino.controller("SlidesTapOneCtrl", function($scope) {
  $scope.date = 'NOVEMBER 2014';
  $scope.title = 'Tapcentive manager UX overhaul and front-end';
  return $scope.images = [
    {
      "alt": "Tapcentive.com UX overhaul and SPA front-end",
      "url": "/img/gif/report.gif",
      "text": "<p>Study the user and their goals and overhaul the experience while re-writing the front-end in Angular.</p><a href='http://tapcentive.com' target='_blank'>Visit Website</a>"
    }
  ];
});

Franchino.controller("SlidesTapTwoCtrl", function($scope) {
  $scope.date = 'OCTOBER 2014';
  $scope.title = 'Desktop and mobile web friendly marketing website';
  return $scope.images = [
    {
      "alt": "Some alt text",
      "url": "/img/franchino-tapcentive-yellow.jpg",
      "text": "<p>Create a knockout brand strategy with an awesome look and feel. Make a sophisticated offering look simple and easy to use.</p><a href='http://tapcentive.com' target='_blank'>Visit Website</a>"
    }
  ];
});

Franchino.controller("SlidesCpgCtrl", function($scope) {
  $scope.date = 'JULY 2014';
  $scope.title = 'Identity, full-stack MVP, and marketing website for a new CPG eDistribution company';
  return $scope.images = [
    {
      "alt": "Some alt text",
      "url": "/img/francino_cpgio.jpg",
      "text": "<p>Turn an old school CPG business into a sophisticated technology company. Design secure, automated and transformative platform, technical architecture and execute an MVP enough to aquire first customers. Mission accomplished.</p><a href='http://cpg.io' target='_blank'>Visit Website</a>"
    }
  ];
});

Franchino.controller("SlidesMedycationCtrl", function($scope) {
  $scope.date = 'APRIL 2014';
  $scope.title = 'User experience design and rapid prototyping for Medycation, a new healthcare price comparison website';
  return $scope.images = [
    {
      "alt": "Some alt text",
      "url": "/img/franchino-medycation.jpg",
      "text": "<p>Waltz up in the online healthcare industry guns blazing with killer design and instincts. Get this new company off the ground with it's MVP. Swipe for more views.</p><a href='http://medycation.com' target='_blank'>Visit Website</a>"
    }, {
      "alt": "Some alt text",
      "url": "/img/franchino-medycation2.jpg",
      "text": ""
    }, {
      "alt": "Some alt text",
      "url": "/img/franchino-medycation3.jpg"
    }, {
      "alt": "Some alt text",
      "url": "/img/franchino-medycation4.jpg"
    }
  ];
});

Franchino.controller("SlidesCSTCtrl", function($scope) {
  $scope.date = 'APRIL 2014';
  $scope.title = 'Designed and developed a new version of the Chicago Sun Times using a hybrid Ionic/Angular stack';
  return $scope.images = [
    {
      "alt": "Some alt text",
      "url": "/img/franchino-cst.jpg",
      "text": "<p>Help the struggling media giant upgrade their consumer facing technology. Create one code base in Angular capable of generating kick-ass experiences for mobile, tablet, web and TV."
    }, {
      "alt": "Some alt text",
      "url": "/img/franchino-cst2.jpg"
    }, {
      "alt": "Some alt text",
      "url": "/img/franchino-cst3.jpg"
    }
  ];
});

Franchino.controller("SlidesKoupnCtrl", function($scope) {
  $scope.date = 'MARCH 2014';
  $scope.title = 'Brand refresh, marketing site and platform experience overhaul';
  return $scope.images = [
    {
      "alt": "Some alt text",
      "url": "/img/franchino-koupn1.jpg"
    }, {
      "alt": "Some alt text",
      "url": "/img/franchino-koupn2.jpg"
    }, {
      "alt": "Some alt text",
      "url": "/img/franchino-koupn.jpg"
    }
  ];
});

Franchino.controller("SlidesTroundCtrl", function($scope) {
  $scope.date = 'AUGUST 2013';
  $scope.title = 'Social travel mobile app design, UX and rapid prototyping';
  return $scope.images = [
    {
      "alt": "Some alt text",
      "url": "/img/francino_tround.jpg",
      "text": "Design an Instagram based social travel app. Why? I don't know."
    }
  ];
});

Franchino.controller("SlidesMonthlysCtrl", function($scope) {
  $scope.date = 'FEBRUARY 2013';
  $scope.title = 'Customer portal platform UX design and front-end';
  return $scope.images = [
    {
      "alt": "Some alt text",
      "url": "/img/franchino-monthlys-biz2.jpg"
    }, {
      "alt": "Some alt text",
      "url": "/img/franchino_monthlys.jpg"
    }
  ];
});

Franchino.controller("SlidesMonthlysTwoCtrl", function($scope) {
  $scope.date = 'MARCH 2012';
  $scope.title = 'Entrepreneur in residence at Lightbank';
  return $scope.images = [
    {
      "alt": "Some alt text",
      "url": "/img/franchino-monthlys7.jpg"
    }, {
      "alt": "Some alt text",
      "url": "/img/franchino-monthlys5.jpg"
    }, {
      "alt": "Some alt text",
      "url": "/img/franchino-monthlys2.jpg"
    }
  ];
});

Franchino.controller('AboutCtrl', function($scope) {});

Franchino.controller('AppCtrl', function($scope) {});

Franchino.controller('ResumeCtrl', function($scope) {
  return $scope.blob = '<div class="row"><div class="large-12"><div class="row"><div class="large-12 columns"><h6>NOV 2013 - PRESENT</h6><br/><h2>Hybrid Experience Designer/Developer, Independent</h2><br/><p>Worked with noteable entreprenours on several new product and business launches. Held numerous roles, including content strategist, user researcher, designer and developer. </p><p><strong>Companies</strong></p><ul class="no"><li><a href="http://tapcentive.com" target="_blank">Tapcentive</a></li><li><a href="http://cpg.io" target="_blank">CPGio</a></li><li><a href="http://kou.pn/">Kou.pn Media</a></li><li> <a href="http://medycation.com" target="_blank">Medycation</a></li><li> <a href="http://www.suntimes.com/" target="_blank">Chicago Sun Times</a></li></ul><br/><p><strong>Tapcentive Deliverables</strong></p><ul class="bullets"><li>Complete Tapcentive.com marketing website and UX overhaul of core product, the "Tapcentive Manager"</li><li>Industrial design of the Tapcentive Touchpoint</li><li>Content strategy for corporate marketing site</li><li>Mobile first marketing website using Ionic and Angular</li></ul><p><strong>CPGio Deliverables</strong></p><ul class="bullets"><li>Product and business strategy, technical architecture and specification design</li><li>One hundred page proposal template on business model and corporate capabilities</li><li>Marketing website design and content strategy</li><li>Core product design and MVP functional prototype</li></ul><p><strong>Kou.pn Deliverables</strong></p><ul class="bullets"><li>Kou.pn Media brand refresh</li><li>Marketing site redesign</li><li>Portal user experience overhaul</li></ul><p><strong>Medycation Deliverables</strong></p><ul class="bullets"><li>Conceptual design and art direction</li><li>User research</li><li>Rapid prototypes</li></ul><p><strong>Chicago Sun Times</strong></p><ul class="bullets"><li>Conceptual design and art direction</li><li>Native iOS and Android app design and junior development</li><li>Hybrid Ionic/Angular development</li></ul></div></div><br/><div class="row"><div class="large-12 columns"><h6>MARCH 2010 - OCTOBER 2013</h6><br/><h2>Director of User Experience, Lightbank</h2><br/><p>Launched and supported multiple new companies within the Lightbank portfolio. </p><p><strong>Companies</strong></p><ul class="no"><li> <a href="http://chicagoideas.com" target="_blank">ChicagoIdeas.com</a></li><li> <a href="http://benchprep.com" target="_blank">BenchPrep.com</a></li><li> <a href="http://snapsheetapp.com" target="_blank">SnapSheetApp.com</a></li><li>Monthlys.com (defunct)</li><li> <a href="http://dough.com" target="_blank">Dough.com</a></li><li> <a href="http://groupon.com" target="_blank">Groupon.com</a></li></ul><br/><p><strong>Chicago Ideas Deliverables</strong></p><ul class="bullets"><li>Website design refresh, art direction</li><li>Custom ticket purchasing platform UX research &amp; design</li><li>Ruby on Rails development, maintenence</li><li>Graphic design support</li><li>Annual report design</li></ul><p><strong>BenchPrep.com Deliverables</strong></p><ul class="bullets"><li>Re-branding, complete BenchPrep identity package</li><li>Supported company with all design and ux from zero to eight million in financing</li><li>Lead art and UX direction for two years</li><li>Front-end using Backbone and Bootstrap</li><li>User research, ethnographic studies, user testing</li><li>Email marketing cadence system design and execution</li><li>Scripted, storyboarded and executed both animated and live motion explainer videos</li></ul><p><strong>SnapSheetApp.com Deliverables</strong></p><ul class="bullets"><li>Large scale portal UX research and information architecture</li><li>Three rounds of rapid prototyping and user testing</li><li>Graphic design and interaction design framework</li><li>User testing</li></ul><p><strong>Monthlys.com Deliverables</strong></p><ul class="bullets"><li>Identity and art direction</li><li>Product strategy and new company launch</li><li>Online marketing strategy, including transactional email, promotion design and lead generation</li><li>Product experience design and front-end</li><li>Content strategy</li><li>Scripted, storyboarded and executed both animated and live motion explainer videos</li></ul><p><strong>Dough.com Deliverables</strong></p><ul class="bullets bullets"><li>Consumer journey mapping and ethnographic studies</li><li>Rapid prototyping, conceptual design</li><li>Messaging strategy, user testing</li></ul><p><strong>Groupon.com Deliverables</strong></p><ul class="bullets"><li>Emerging markets research</li><li>Rapid design and prototyping</li><li>Visual design on new concepts</li><li>Email segmentation research</li></ul></div></div><br/><div class="row"><div class="large-12 columns"><h6>NOVEMBER 2007 - APRIL 2010</h6><br/><h2>Developer &amp; Co-founder, Dillyeo.com</h2><br/><p>Co-founded, designed and developed a daily deal eCommerce website.</p><p><strong>Role</strong><br/>Designed, developed and launched companies first cart with PHP. Iterated and grew site to more than two hundred and fifty thousand subscribers in less than one year. </p><p><strong>Noteable Stats</strong></p><ul class="bullets"><li>Built a list of 250,000 subscribers in the first year</li><li>Pivoted and tweaked design, business and approach to 1000 transactions per daily</li><li>Sold business in December 2009 to Innovative Commerce Solutions</li></ul></div></div><br/><div class="row"><div class="large-12 columns"><h6>MARCH 2005 - OCTOBER 2007</h6><br/><h2>Solutions Architect &amp; Senior Developer, <a href="http://www.manifestdigital.com/">Manifest Digital</a></h2><br/><p>Built and managed multiple CareerBuilder.com niche sites for the largest independent agency in the midwest.</p><p><strong>Role</strong><br/>Research and explore emerging technologies, implement solutions and manage other developers. Worked with asp.net on a daily basis for almost two years. </p><p><strong>Noteable Accomplishments</strong></p><ul class="bullets"><li>Recognized for launching high quality web app for Career Builder in record time</li><li>Managed extreme SEO project with more than 500 thousand links, pages and over 8 million UGC artifacts</li><li>Shifted agencies development practices to various new client-centric AJAX methodologies</li><li>Managed multiple projects concurrently, including choosechicago.com and briefing.com</li></ul></div></div><br/><div class="row"><div class="large-12 columns"><h6>APRIL 2004 - JANUARY 2007</h6><br/><h2>Junior PLD Developer,  <a href="http://www.manifestdigital.com/">Avenue</a></h2><br/><p>Front-end developer and UX design intern for Avenue A Razorfishs\' legacy company, Avenue-inc.</p><p><strong>Role</strong><br/>Develop front-end for multiple client websites, including flor.com, achievement.org, canyonranch.com and turbochef.</p><p><strong>Noteable Accomplishments</strong></p><ul class="bullets"><li>Executed front-end projects on-time and under-budget</li><li>Assigned UX internship role, recognized by design team as a young talent</li><li>Wireframed custom shopping cart platform for flor.com</li><li>Developed internal SEO practice</li></ul></div></div><br/><div class="row"><div class="large-12 columns"><h6>JULY 2000 - JANUARY 2004</h6><br/><h2>eCommerce Developer, Atova</h2><br/><p>General web designer and developer for family owned paint distribution business. </p><p><strong>Role</strong><br/>Built several shopping carts in classic ASP and PHP. Grew business using online marketing strategies to two million in revenue. </p><p><strong>Noteable Accomplishments</strong></p><ul class="bullets"><li>Became first company to ship paints and coatings across the United States</li><li>First employee, developed company to 2+ million in revenue with Overture, Google Adwords and SEO</li><li>Created, marketed and subscribed vocational school for specialty coatings</li><li>Worked with top Italian paint manufacturers overseas to build exclusive distribution rights</li></ul></div></div><br/><div class="row"><div class="large-12 columns"><h6>SEPTEMBER 2000 - MAY 2002</h6><br/><h2>Education</h2><br/><p>Self educated designer/programmer with vocational training. </p><p><strong>Certifications</strong><br/>iNET+, A+ Certification </p><p><strong>Apprenticeship</strong><br/>Year long personal apprenticeship with first engineer at Amazon.com</p></div></div></div></div><br/><br/>';
});

Franchino.controller('JobTapcentiveCtrl', function($scope) {});

Franchino.controller('JobTapcentiveTwoCtrl', function($scope) {});

Franchino.controller('JobCpgioCtrl', function($scope) {});

Franchino.controller('JobMedycationCtrl', function($scope) {});

Franchino.controller('JobCstCtrl', function($scope) {});

Franchino.controller('JobKoupnCtrl', function($scope) {});

Franchino.controller('JobMedycationCtrl', function($scope) {});

Franchino.controller('JobMedycationCtrl', function($scope) {});

Franchino.controller('JobTroundCtrl', function($scope) {});

Franchino.controller('JobMonthlysOneCtrl', function($scope) {});

Franchino.controller('JobMonthlysTwoCtrl', function($scope) {});

Franchino.controller('JobBenchprepCtrl', function($scope) {});

Franchino.controller('ContactCtrl', function($scope) {});

Franchino.controller('DevelopersCtrl', function($scope) {});

Franchino.controller('DeveloperCenterCtrl', function($scope) {});

Franchino.controller('DocsCtrl', function($scope, Docs) {
  return $scope.$watch((function() {
    return Docs.list;
  }), function() {
    return $scope.docs = Docs.list;
  });
});

Franchino.controller('DocCtrl', function($scope, $sce, $stateParams, $timeout, Docs) {
  $scope.index = $stateParams.step ? $stateParams.step - 1 : 0;
  $scope.$watch((function() {
    return Docs.list;
  }), function() {
    $scope.doc = Docs.find($stateParams.permalink);
    if ($scope.doc) {
      $scope.step = $scope.doc.steps[$scope.index];
      $scope.step.url = $sce.trustAsResourceUrl($scope.step.url);
      if ($scope.step.type === 'dialog') {
        $scope.messageIndex = 0;
        $scope.messages = [];
        return $timeout($scope.nextMessage, 1000);
      }
    }
  });
  return $scope.hasMoreSteps = function() {
    if ($scope.step) {
      return $scope.step.index < $scope.doc.steps.length;
    }
  };
});

Franchino.directive('mySlideshow', function() {
  return {
    restrict: 'AC',
    link: function(scope, element, attrs) {
      var config;
      config = angular.extend({
        slides: '.slide'
      }, scope.$eval(attrs.mySlideshow));
      return setTimeout((function() {
        return $(element).cycle(function() {
          return {
            fx: 'fade',
            speed: 'fast',
            next: '#next2',
            prev: '#prev2',
            caption: '#alt-caption',
            caption_template: '{{images.alt}}',
            pause_on_hover: 'true'
          };
        });
      }), 0);
    }
  };
});

angular.module("tap.controllers", []);

angular.module("tap.directives", []).directive("device", function() {
  return {
    restrict: "A",
    link: function() {
      return device.init();
    }
  };
}).service('copy', function($sce) {
  var copy, trustValues;
  copy = {
    about: {
      heading: "We're <strong>tapping</strong> into the future",
      sub_heading: "Tapcentive was created by a team that has lived the mobile commerce revolution from the earliest days of mCommerce with WAP, to leading the charge in mobile payments and services with NFC worldwide.",
      copy: "<p>For us, mobile commerce has always been about much more than payment:  marketing, promotions, product content, and loyalty, all come to life inside a mobile phone. Mobile commerce really gets interesting when it bridges the digital and physical worlds.</p><p>Our goal at Tapcentive is to create a state-of-the-art mobile engagement platform that enables marketers and developers to create entirely new customer experiences in physical locations – all with a minimum amount of technology development.</p><p>We think you’ll like what we’ve built so far. And just as mobile technology is constantly evolving, so is the Tapcentive platform. Give it a test drive today.</p>"
    },
    team: {
      heading: "",
      bios: {
        dave_role: "",
        dave_copy: ""
      }
    }
  };
  trustValues = function(values) {
    return _.each(values, function(val, key) {
      switch (typeof val) {
        case 'string':
          return $sce.trustAsHtml(val);
        case 'object':
          return trustValues(val);
      }
    });
  };
  trustValues(copy);
  return copy;
});

var $, cssId, head, link;

if (device.desktop()) {

} else if (device.mobile()) {
  $ = document;
  cssId = 'myCss';
  if (!$.getElementById(cssId)) {
    head = $.getElementsByTagName('head')[0];
    link = $.createElement('link');
    link.id = cssId;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://code.ionicframework.com/1.0.0-beta.13/css/ionic.min.css';
    link.media = 'all';
    head.appendChild(link);
  }
}

$(document).ready(function() {
  $(".header").scrollToFixed({
    preFixed: function() {
      $(this).find("h1").css("color", "blue");
    },
    postFixed: function() {
      $(this).find("h1").css("color", "");
    }
  });
  $("#summary").scrollToFixed({
    marginTop: $(".header").outerHeight() + 10,
    limit: $(".footer").offset().top - $("#summary").outerHeight() - 10,
    zIndex: 999,
    preFixed: function() {
      $(this).find(".title").css("color", "blue");
    },
    preAbsolute: function() {
      $(this).find(".title").css("color", "red");
    },
    postFixed: function() {
      $(this).find(".title").css("color", "");
    },
    postAbsolute: function() {
      $(this).find(".title").css("color", "");
    }
  });
  $(".footer").scrollToFixed({
    bottom: 0,
    limit: $(".footer").offset().top,
    preFixed: function() {
      $(this).find("h1").css("color", "blue");
    },
    postFixed: function() {
      $(this).find("h1").css("color", "");
    }
  });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb2ZmZWUiLCJjb250cm9sbGVycy5jb2ZmZWUiLCJkaXJlY3RpdmVzLmNvZmZlZSIsImluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUcsTUFBTSxDQUFDLE9BQVAsQ0FBQSxDQUFIO0FBQ0UsRUFBQSxNQUFNLENBQUMsU0FBUCxHQUFtQixPQUFPLENBQUMsTUFBUixDQUFlLFdBQWYsRUFBNEIsQ0FBQyxZQUFELEVBQWUsV0FBZixFQUE0QixrQkFBNUIsRUFBZ0QsaUJBQWhELEVBQW1FLGdCQUFuRSxDQUE1QixDQUFuQixDQURGO0NBQUEsTUFBQTtBQUlFLEVBQUEsTUFBTSxDQUFDLFNBQVAsR0FBbUIsT0FBTyxDQUFDLE1BQVIsQ0FBZSxXQUFmLEVBQTRCLENBQUUsT0FBRixFQUFXLGtCQUFYLEVBQStCLGlCQUEvQixFQUFrRCxnQkFBbEQsQ0FBNUIsQ0FDakIsQ0FBQyxHQURnQixDQUNaLFNBQUMsY0FBRCxHQUFBO1dBQ0gsY0FBYyxDQUFDLEtBQWYsQ0FBcUIsU0FBQSxHQUFBO0FBQ25CLE1BQUEsSUFBNEIsTUFBTSxDQUFDLFNBQW5DO2VBQUEsU0FBUyxDQUFDLFlBQVYsQ0FBQSxFQUFBO09BRG1CO0lBQUEsQ0FBckIsRUFERztFQUFBLENBRFksQ0FBbkIsQ0FKRjtDQUFBOztBQUFBLFNBU1MsQ0FBQyxNQUFWLENBQWlCLFNBQUMsY0FBRCxFQUFpQixrQkFBakIsRUFBcUMsaUJBQXJDLEVBQXdELGFBQXhELEdBQUE7QUFDZixFQUFBLGNBQ0UsQ0FBQyxLQURILENBQ1MsS0FEVCxFQUVJO0FBQUEsSUFBQSxHQUFBLEVBQUssRUFBTDtBQUFBLElBQ0EsUUFBQSxFQUFVLElBRFY7QUFBQSxJQUVBLFVBQUEsRUFBWSxTQUZaO0FBQUEsSUFHQSxXQUFBLEVBQWEsV0FIYjtHQUZKLENBT0UsQ0FBQyxLQVBILENBT1MsVUFQVCxFQVFJO0FBQUEsSUFBQSxHQUFBLEVBQUssR0FBTDtBQUFBLElBQ0EsS0FBQSxFQUNFO0FB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QUMsR0FEN0I7QUFBQSxJQUVBLFFBQUEsRUFBVSxTQUFBLEdBQUE7QUFDUixNQUFBLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxJQUFSLENBQWEsSUFBYixDQUFrQixDQUFDLEdBQW5CLENBQXVCLE9BQXZCLEVBQWdDLE1BQWhDLENBQUEsQ0FEUTtJQUFBLENBRlY7QUFBQSxJQU1BLFNBQUEsRUFBVyxTQUFBLEdBQUE7QUFDVCxNQUFBLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxJQUFSLENBQWEsSUFBYixDQUFrQixDQUFDLEdBQW5CLENBQXVCLE9BQXZCLEVBQWdDLEVBQWhDLENBQUEsQ0FEUztJQUFBLENBTlg7R0FERixDQTdCQSxDQURnQjtBQUFBLENBQWxCLENBaEJBLENBQUEiLCJmaWxlIjoiYXBwbGljYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpZiBkZXZpY2UuZGVza3RvcCgpXG4gIHdpbmRvdy5GcmFuY2hpbm8gPSBhbmd1bGFyLm1vZHVsZSgnRnJhbmNoaW5vJywgWyduZ1Nhbml0aXplJywgJ3VpLnJvdXRlcicsICdidGZvcmQuc29ja2V0LWlvJywgJ3RhcC5jb250cm9sbGVycycsICd0YXAuZGlyZWN0aXZlcyddKVxuXG5lbHNlXG4gIHdpbmRvdy5GcmFuY2hpbm8gPSBhbmd1bGFyLm1vZHVsZShcIkZyYW5jaGlub1wiLCBbIFwiaW9uaWNcIiwgXCJidGZvcmQuc29ja2V0LWlvXCIsIFwidGFwLmNvbnRyb2xsZXJzXCIsICd0YXAuZGlyZWN0aXZlcyddKVxuICAgIC5ydW4gKCRpb25pY1BsYXRmb3JtKSAtPlxuICAgICAgJGlvbmljUGxhdGZvcm0ucmVhZHkgLT5cbiAgICAgICAgU3RhdHVzQmFyLnN0eWxlRGVmYXVsdCgpIGlmIHdpbmRvdy5TdGF0dXNCYXJcblxuRnJhbmNoaW5vLmNvbmZpZyAoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIsICRodHRwUHJvdmlkZXIpIC0+XG4gICRzdGF0ZVByb3ZpZGVyXG4gICAgLnN0YXRlICdhcHAnLFxuICAgICAgdXJsOiAnJ1xuICAgICAgYWJzdHJhY3Q6IHRydWVcbiAgICAgIGNvbnRyb2xsZXI6ICdBcHBDdHJsJ1xuICAgICAgdGVtcGxhdGVVcmw6ICdtZW51Lmh0bWwnXG5cbiAgICAuc3RhdGUgJ2FwcC5ob21lJyxcbiAgICAgIHVybDogJy8nXG4gICAgICB2aWV3czpcbiAgICAgICAgbWVudUNvbnRlbnQ6XG4gICAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDdHJsJ1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnaG9tZS5odG1sJ1xuXG4gICAgLnN0YXRlICdhcHAuZG9jcycsXG4gICAgICB1cmw6ICcvZG9jcydcbiAgICAgIHZpZXdzOlxuICAgICAgICBtZW51Q29udGVudDpcbiAgICAgICAgICBjb250cm9sbGVyOiAnRG9jc0N0cmwnXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdkb2NzL2luZGV4Lmh0bWwnXG5cbiAgICAuc3RhdGUgJ2FwcC5hYm91dCcsXG4gICAgICB1cmw6ICcvYWJvdXQnXG4gICAgICB2aWV3czpcbiAgICAgICAgbWVudUNvbnRlbnQ6XG4gICAgICAgICAgY29udHJvbGxlcjogJ0Fib3V0Q3RybCdcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2Fib3V0Lmh0bWwnXG5cblxuICAgIC5zdGF0ZSAnYXBwLmJsb2cnLFxuICAgICAgdXJsOiAnL2Jsb2cnXG4gICAgICB2aWV3czpcbiAgICAgICAgbWVudUNvbnRlbnQ6XG4gICAgICAgICAgY29udHJvbGxlcjogJ0Jsb2dDdHJsJ1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYmxvZy5odG1sJ1xuXG4gICAgLnN0YXRlICdhcHAucmVzdW1lJyxcbiAgICAgIHVybDogJy9yZXN1bWUnXG4gICAgICB2aWV3czpcbiAgICAgICAgbWVudUNvbnRlbnQ6XG4gICAgICAgICAgY29udHJvbGxlcjogJ1Jlc3VtZUN0cmwnXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdyZXN1bWUuaHRtbCdcblxuICAgIC5zdGF0ZSAnYXBwLmNvbnRhY3QnLFxuICAgICAgdXJsOiAnL2NvbnRhY3QnXG4gICAgICB2aWV3czpcbiAgICAgICAgbWVudUNvbnRlbnQ6XG4gICAgICAgICAgY29udHJvbGxlcjogJ0NvbnRhY3RDdHJsJ1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnY29udGFjdC5odG1sJ1xuXG4gICAgLnN0YXRlICdhcHAuZG9jJyxcbiAgICAgIHVybDogJy9kb2NzLzpwZXJtYWxpbmsnXG4gICAgICB2aWV3czpcbiAgICAgICAgbWVudUNvbnRlbnQ6XG4gICAgICAgICAgY29udHJvbGxlcjogJ0RvY0N0cmwnXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdkb2NzL3Nob3cuaHRtbCdcblxuICAgIC5zdGF0ZSAnYXBwLnN0ZXAnLFxuICAgICAgdXJsOiAnL2RvY3MvOnBlcm1hbGluay86c3RlcCdcbiAgICAgIHZpZXdzOlxuICAgICAgICBtZW51Q29udGVudDpcbiAgICAgICAgICBjb250cm9sbGVyOiAnRG9jQ3RybCdcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2RvY3Mvc2hvdy5odG1sJ1xuXG4gICAgLnN0YXRlICdhcHAuam9iLXRhcGNlbnRpdmUnLFxuICAgICAgdXJsOiAnL2pvYi10YXBjZW50aXZlJ1xuICAgICAgdmlld3M6XG4gICAgICAgIG1lbnVDb250ZW50OlxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdKb2JUYXBjZW50aXZlQ3RybCdcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2pvYi10YXBjZW50aXZlLmh0bWwnXG5cbiAgICAuc3RhdGUgJ2FwcC5qb2ItdGFwY2VudGl2ZS10d28nLFxuICAgICAgdXJsOiAnL2pvYi10YXBjZW50aXZlLXR3bydcbiAgICAgIHZpZXdzOlxuICAgICAgICBtZW51Q29udGVudDpcbiAgICAgICAgICBjb250cm9sbGVyOiAnSm9iVGFwY2VudGl2ZVR3b0N0cmwnXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdqb2ItdGFwY2VudGl2ZS10d28uaHRtbCdcblxuICAgIC5zdGF0ZSAnYXBwLmpvYi1jcGdpbycsXG4gICAgICB1cmw6ICcvam9iLWNwZ2lvJ1xuICAgICAgdmlld3M6XG4gICAgICAgIG1lbnVDb250ZW50OlxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdKb2JDcGdpb0N0cmwnXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdqb2ItY3BnaW8uaHRtbCdcblxuICAgIC5zdGF0ZSAnYXBwLmpvYi1tZWR5Y2F0aW9uJyxcbiAgICAgIHVybDogJy9qb2ItbWVkeWNhdGlvbidcbiAgICAgIHZpZXdzOlxuICAgICAgICBtZW51Q29udGVudDpcbiAgICAgICAgICBjb250cm9sbGVyOiAnSm9iTWVkeWNhdGlvbkN0cmwnXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdqb2ItbWVkeWNhdGlvbi5odG1sJ1xuXG4gICAgLnN0YXRlICdhcHAuam9iLWNzdCcsXG4gICAgICB1cmw6ICcvam9iLWNzdCdcbiAgICAgIHZpZXdzOlxuICAgICAgICBtZW51Q29udGVudDpcbiAgICAgICAgICBjb250cm9sbGVyOiAnSm9iQ3N0Q3RybCdcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2pvYi1jc3QuaHRtbCdcblxuICAgIC5zdGF0ZSAnYXBwLmpvYi1rb3VwbicsXG4gICAgICB1cmw6ICcvam9iLWtvdXBuJ1xuICAgICAgdmlld3M6XG4gICAgICAgIG1lbnVDb250ZW50OlxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdKb2JLb3VwbkN0cmwnXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdqb2Ita291cG4uaHRtbCdcblxuICAgIC5zdGF0ZSAnYXBwLmpvYi10cm91bmQnLFxuICAgICAgdXJsOiAnL2pvYi10cm91bmQnXG4gICAgICB2aWV3czpcbiAgICAgICAgbWVudUNvbnRlbnQ6XG4gICAgICAgICAgY29udHJvbGxlcjogJ0pvYlRyb3VuZEN0cmwnXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdqb2ItdHJvdW5kLmh0bWwnXG5cbiAgICAuc3RhdGUgJ2FwcC5qb2ItbW9udGhseXMnLFxuICAgICAgdXJsOiAnL2pvYi1tb250aGx5cydcbiAgICAgIHZpZXdzOlxuICAgICAgICBtZW51Q29udGVudDpcbiAgICAgICAgICBjb250cm9sbGVyOiAnSm9iTW9udGhseXNDdHJsJ1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnam9iLW1vbnRobHlzLmh0bWwnXG5cbiAgICAuc3RhdGUgJ2FwcC5qb2ItbW9udGhseXMtdHdvJyxcbiAgICAgIHVybDogJy9qb2ItbW9udGhseXMtdHdvJ1xuICAgICAgdmlld3M6XG4gICAgICAgIG1lbnVDb250ZW50OlxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdKb2JNb250aGx5c1R3b0N0cmwnXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdqb2ItbW9udGhseXMtdHdvLmh0bWwnXG5cbiAgICAuc3RhdGUgJ2FwcC5qb2ItYmVuY2hwcmVwJyxcbiAgICAgIHVybDogJy9qb2ItYmVuY2hwcmVwJ1xuICAgICAgdmlld3M6XG4gICAgICAgIG1lbnVDb250ZW50OlxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdKb2JCZW5jaHByZXBDdHJsJ1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnam9iLWJlbmNocHJlcC5odG1sJ1xuXG5cblxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UgXCIvXCJcblxuICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2ggLT5cbiAgICAgICByZXF1ZXN0OiAoY29uZmlnKSAtPlxuICAgICAgICAgaWYgY29uZmlnLnVybC5tYXRjaCgvXFwuaHRtbCQvKSAmJiAhY29uZmlnLnVybC5tYXRjaCgvXnNoYXJlZFxcLy8pXG4gICAgICAgICAgIGlmIGRldmljZS50YWJsZXQoKVxuICAgICAgICAgICAgIHR5cGUgPSAndGFibGV0J1xuICAgICAgICAgICBlbHNlIGlmIGRldmljZS5tb2JpbGUoKVxuICAgICAgICAgICAgIHR5cGUgPSAnbW9iaWxlJ1xuICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgdHlwZSA9ICdkZXNrdG9wJ1xuXG4gICAgICAgICAgIGNvbmZpZy51cmwgPSBcIi8je3R5cGV9LyN7Y29uZmlnLnVybH1cIlxuXG4gICAgICAgICBjb25maWdcblxuRnJhbmNoaW5vLnJ1biAoJHN0YXRlKSAtPlxuICAkc3RhdGUuZ28oJ2FwcC5ob21lJylcblxuRnJhbmNoaW5vLnJ1biAoJHJvb3RTY29wZSwgY29weSkgLT5cbiAgJHJvb3RTY29wZS5jb3B5ID0gY29weVxuXG5GcmFuY2hpbm8uZmFjdG9yeSAnU29ja2V0JywgKHNvY2tldEZhY3RvcnkpIC0+XG4gIHNvY2tldEZhY3RvcnkoKVxuXG5GcmFuY2hpbm8uZmFjdG9yeSAnRG9jcycsIChTb2NrZXQpIC0+XG4gIHNlcnZpY2UgPVxuICAgIGxpc3Q6IFtdXG4gICAgZmluZDogKHBlcm1hbGluaykgLT5cbiAgICAgIF8uZmluZCBzZXJ2aWNlLmxpc3QsIChkb2MpIC0+XG4gICAgICAgIGRvYy5wZXJtYWxpbmsgPT0gcGVybWFsaW5rXG5cbiAgU29ja2V0Lm9uICdkb2NzJywgKGRvY3MpIC0+XG4gICAgc2VydmljZS5saXN0ID0gZG9jc1xuXG4gIHNlcnZpY2VcblxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0hvbWVDdHJsJywgKCRzY29wZSkgLT5cbiAgXG5GcmFuY2hpbm8uY29udHJvbGxlciAnQ29udGFjdFNoZWV0Q3RybCcsICgkc2NvcGUsICRpb25pY0FjdGlvblNoZWV0KSAtPlxuICAkc2NvcGUuc2hvd0FjdGlvbnNoZWV0ID0gLT5cbiAgICAkaW9uaWNBY3Rpb25TaGVldC5zaG93XG4gICAgICB0aXRsZVRleHQ6IFwiQ29udGFjdCBGcmFuY2hpbm9cIlxuICAgICAgYnV0dG9uczogW1xuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogXCJHaXRodWIgPGkgY2xhc3M9XFxcImljb24gaW9uLXNoYXJlXFxcIj48L2k+XCJcbiAgICAgICAgfVxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogXCJFbWFpbCBNZSA8aSBjbGFzcz1cXFwiaWNvbiBpb24tZW1haWxcXFwiPjwvaT5cIlxuICAgICAgICB9XG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiBcIlR3aXR0ZXIgPGkgY2xhc3M9XFxcImljb24gaW9uLXNvY2lhbC10d2l0dGVyXFxcIj48L2k+XCJcbiAgICAgICAgfVxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogXCIyMjQtMjQxLTkxODkgPGkgY2xhc3M9XFxcImljb24gaW9uLWlvcy10ZWxlcGhvbmVcXFwiPjwvaT5cIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgICBjYW5jZWxUZXh0OiBcIkNhbmNlbFwiXG4gICAgICBjYW5jZWw6IC0+XG4gICAgICAgIGNvbnNvbGUubG9nIFwiQ0FOQ0VMTEVEXCJcbiAgICAgICAgcmV0dXJuXG5cbiAgICAgIGJ1dHRvbkNsaWNrZWQ6IChpbmRleCkgLT5cbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIjIyNC0yNDEtOTE4OVwiICBpZiBpbmRleCBpcyAyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCJodHRwOi8vdHdpdHRlci5jb20vZnJhbmNoaW5vX2NoZVwiICBpZiBpbmRleCBpcyAyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCJtYWlsdG86ZnJhbmNoaW5vLm5vbmNlQGdtYWlsLmNvbVwiICBpZiBpbmRleCBpcyAxXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCJodHRwOi8vZ2l0aHViLmNvbS9mcmFuZ3VjY1wiICBpZiBpbmRleCBpcyAwXG4gICAgICAgIHRydWVcblxuICByZXR1cm5cbkZyYW5jaGluby5jb250cm9sbGVyIFwiU2xpZGVzVGFwT25lQ3RybFwiLCAoJHNjb3BlKSAtPlxuICAkc2NvcGUuZGF0ZSA9ICdOT1ZFTUJFUiAyMDE0J1xuICAkc2NvcGUudGl0bGUgPSAnVGFwY2VudGl2ZSBtYW5hZ2VyIFVYIG92ZXJoYXVsIGFuZCBmcm9udC1lbmQnXG4gICRzY29wZS5pbWFnZXMgPSBbXG4gICAge1xuICAgICAgXCJhbHRcIiA6IFwiVGFwY2VudGl2ZS5jb20gVVggb3ZlcmhhdWwgYW5kIFNQQSBmcm9udC1lbmRcIixcbiAgICAgIFwidXJsXCIgOiBcIi9pbWcvZ2lmL3JlcG9ydC5naWZcIixcbiAgICAgIFwidGV4dFwiIDogXCI8cD5TdHVkeSB0aGUgdXNlciBhbmQgdGhlaXIgZ29hbHMgYW5kIG92ZXJoYXVsIHRoZSBleHBlcmllbmNlIHdoaWxlIHJlLXdyaXRpbmcgdGhlIGZyb250LWVuZCBpbiBBbmd1bGFyLjwvcD48YSBocmVmPSdodHRwOi8vdGFwY2VudGl2ZS5jb20nIHRhcmdldD0nX2JsYW5rJz5WaXNpdCBXZWJzaXRlPC9hPlwiXG4gICAgfVxuICBdXG5cbkZyYW5jaGluby5jb250cm9sbGVyIFwiU2xpZGVzVGFwVHdvQ3RybFwiLCAoJHNjb3BlKSAtPlxuICAkc2NvcGUuZGF0ZSA9ICdPQ1RPQkVSIDIwMTQnXG4gICRzY29wZS50aXRsZSA9ICdEZXNrdG9wIGFuZCBtb2JpbGUgd2ViIGZyaWVuZGx5IG1hcmtldGluZyB3ZWJzaXRlJyBcbiAgJHNjb3BlLmltYWdlcyA9IFtcbiAgICB7XG4gICAgICBcImFsdFwiIDogXCJTb21lIGFsdCB0ZXh0XCIsXG4gICAgICBcInVybFwiIDogXCIvaW1nL2ZyYW5jaGluby10YXBjZW50aXZlLXllbGxvdy5qcGdcIixcbiAgICAgIFwidGV4dFwiIDogXCI8cD5DcmVhdGUgYSBrbm9ja291dCBicmFuZCBzdHJhdGVneSB3aXRoIGFuIGF3ZXNvbWUgbG9vayBhbmQgZmVlbC4gTWFrZSBhIHNvcGhpc3RpY2F0ZWQgb2ZmZXJpbmcgbG9vayBzaW1wbGUgYW5kIGVhc3kgdG8gdXNlLjwvcD48YSBocmVmPSdodHRwOi8vdGFwY2VudGl2ZS5jb20nIHRhcmdldD0nX2JsYW5rJz5WaXNpdCBXZWJzaXRlPC9hPlwiXG4gICAgfVxuXG4gIF1cblxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgXCJTbGlkZXNDcGdDdHJsXCIsICgkc2NvcGUpIC0+XG4gICRzY29wZS5kYXRlID0gJ0pVTFkgMjAxNCdcbiAgJHNjb3BlLnRpdGxlID0gJ0lkZW50aXR5LCBmdWxsLXN0YWNrIE1WUCwgYW5kIG1hcmtldGluZyB3ZWJzaXRlIGZvciBhIG5ldyBDUEcgZURpc3RyaWJ1dGlvbiBjb21wYW55JyBcbiAgJHNjb3BlLmltYWdlcyA9IFtcbiAgICB7XG4gICAgICBcImFsdFwiIDogXCJTb21lIGFsdCB0ZXh0XCIsXG4gICAgICBcInVybFwiIDogXCIvaW1nL2ZyYW5jaW5vX2NwZ2lvLmpwZ1wiLFxuICAgICAgXCJ0ZXh0XCIgOiBcIjxwPlR1cm4gYW4gb2xkIHNjaG9vbCBDUEcgYnVzaW5lc3MgaW50byBhIHNvcGhpc3RpY2F0ZWQgdGVjaG5vbG9neSBjb21wYW55LiBEZXNpZ24gc2VjdXJlLCBhdXRvbWF0ZWQgYW5kIHRyYW5zZm9ybWF0aXZlIHBsYXRmb3JtLCB0ZWNobmljYWwgYXJjaGl0ZWN0dXJlIGFuZCBleGVjdXRlIGFuIE1WUCBlbm91Z2ggdG8gYXF1aXJlIGZpcnN0IGN1c3RvbWVycy4gTWlzc2lvbiBhY2NvbXBsaXNoZWQuPC9wPjxhIGhyZWY9J2h0dHA6Ly9jcGcuaW8nIHRhcmdldD0nX2JsYW5rJz5WaXNpdCBXZWJzaXRlPC9hPlwiXG4gICAgfVxuICBdXG5cbkZyYW5jaGluby5jb250cm9sbGVyIFwiU2xpZGVzTWVkeWNhdGlvbkN0cmxcIiwgKCRzY29wZSkgLT5cbiAgJHNjb3BlLmRhdGUgPSAnQVBSSUwgMjAxNCdcbiAgJHNjb3BlLnRpdGxlID0gJ1VzZXIgZXhwZXJpZW5jZSBkZXNpZ24gYW5kIHJhcGlkIHByb3RvdHlwaW5nIGZvciBNZWR5Y2F0aW9uLCBhIG5ldyBoZWFsdGhjYXJlIHByaWNlIGNvbXBhcmlzb24gd2Vic2l0ZSdcbiAgJHNjb3BlLmltYWdlcyA9IFtcbiAgICB7XG4gICAgICBcImFsdFwiIDogXCJTb21lIGFsdCB0ZXh0XCIsXG4gICAgICBcInVybFwiIDogXCIvaW1nL2ZyYW5jaGluby1tZWR5Y2F0aW9uLmpwZ1wiLFxuICAgICAgXCJ0ZXh0XCIgOiBcIjxwPldhbHR6IHVwIGluIHRoZSBvbmxpbmUgaGVhbHRoY2FyZSBpbmR1c3RyeSBndW5zIGJsYXppbmcgd2l0aCBraWxsZXIgZGVzaWduIGFuZCBpbnN0aW5jdHMuIEdldCB0aGlzIG5ldyBjb21wYW55IG9mZiB0aGUgZ3JvdW5kIHdpdGggaXQncyBNVlAuIFN3aXBlIGZvciBtb3JlIHZpZXdzLjwvcD48YSBocmVmPSdodHRwOi8vbWVkeWNhdGlvbi5jb20nIHRhcmdldD0nX2JsYW5rJz5WaXNpdCBXZWJzaXRlPC9hPlwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImFsdFwiIDogXCJTb21lIGFsdCB0ZXh0XCIsXG4gICAgICBcInVybFwiIDogXCIvaW1nL2ZyYW5jaGluby1tZWR5Y2F0aW9uMi5qcGdcIixcbiAgICAgIFwidGV4dFwiIDogXCJcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJhbHRcIiA6IFwiU29tZSBhbHQgdGV4dFwiLFxuICAgICAgXCJ1cmxcIiA6IFwiL2ltZy9mcmFuY2hpbm8tbWVkeWNhdGlvbjMuanBnXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiYWx0XCIgOiBcIlNvbWUgYWx0IHRleHRcIixcbiAgICAgIFwidXJsXCIgOiBcIi9pbWcvZnJhbmNoaW5vLW1lZHljYXRpb240LmpwZ1wiXG4gICAgfSxcbiAgXVxuXG5GcmFuY2hpbm8uY29udHJvbGxlciBcIlNsaWRlc0NTVEN0cmxcIiwgKCRzY29wZSkgLT5cbiAgJHNjb3BlLmRhdGUgPSAnQVBSSUwgMjAxNCdcbiAgJHNjb3BlLnRpdGxlID0gJ0Rlc2lnbmVkIGFuZCBkZXZlbG9wZWQgYSBuZXcgdmVyc2lvbiBvZiB0aGUgQ2hpY2FnbyBTdW4gVGltZXMgdXNpbmcgYSBoeWJyaWQgSW9uaWMvQW5ndWxhciBzdGFjaydcbiAgJHNjb3BlLmltYWdlcyA9IFtcbiAgICB7XG4gICAgICBcImFsdFwiIDogXCJTb21lIGFsdCB0ZXh0XCIsXG4gICAgICBcInVybFwiIDogXCIvaW1nL2ZyYW5jaGluby1jc3QuanBnXCIsXG4gICAgICBcInRleHRcIiA6IFwiPHA+SGVscCB0aGUgc3RydWdnbGluZyBtZWRpYSBnaWFudCB1cGdyYWRlIHRoZWlyIGNvbnN1bWVyIGZhY2luZyB0ZWNobm9sb2d5LiBDcmVhdGUgb25lIGNvZGUgYmFzZSBpbiBBbmd1bGFyIGNhcGFibGUgb2YgZ2VuZXJhdGluZyBraWNrLWFzcyBleHBlcmllbmNlcyBmb3IgbW9iaWxlLCB0YWJsZXQsIHdlYiBhbmQgVFYuXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiYWx0XCIgOiBcIlNvbWUgYWx0IHRleHRcIixcbiAgICAgIFwidXJsXCIgOiBcIi9pbWcvZnJhbmNoaW5vLWNzdDIuanBnXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiYWx0XCIgOiBcIlNvbWUgYWx0IHRleHRcIixcbiAgICAgIFwidXJsXCIgOiBcIi9pbWcvZnJhbmNoaW5vLWNzdDMuanBnXCJcbiAgICB9LFxuICBdXG5cbkZyYW5jaGluby5jb250cm9sbGVyIFwiU2xpZGVzS291cG5DdHJsXCIsICgkc2NvcGUpIC0+XG4gICRzY29wZS5kYXRlID0gJ01BUkNIIDIwMTQnXG4gICRzY29wZS50aXRsZSA9ICdCcmFuZCByZWZyZXNoLCBtYXJrZXRpbmcgc2l0ZSBhbmQgcGxhdGZvcm0gZXhwZXJpZW5jZSBvdmVyaGF1bCdcbiAgJHNjb3BlLmltYWdlcyA9IFtcbiAgICB7XG4gICAgICBcImFsdFwiIDogXCJTb21lIGFsdCB0ZXh0XCIsXG4gICAgICBcInVybFwiIDogXCIvaW1nL2ZyYW5jaGluby1rb3VwbjEuanBnXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiYWx0XCIgOiBcIlNvbWUgYWx0IHRleHRcIixcbiAgICAgIFwidXJsXCIgOiBcIi9pbWcvZnJhbmNoaW5vLWtvdXBuMi5qcGdcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJhbHRcIiA6IFwiU29tZSBhbHQgdGV4dFwiLFxuICAgICAgXCJ1cmxcIiA6IFwiL2ltZy9mcmFuY2hpbm8ta291cG4uanBnXCJcbiAgICB9LFxuICBdXG5cbkZyYW5jaGluby5jb250cm9sbGVyIFwiU2xpZGVzVHJvdW5kQ3RybFwiLCAoJHNjb3BlKSAtPlxuICAkc2NvcGUuZGF0ZSA9ICdBVUdVU1QgMjAxMydcbiAgJHNjb3BlLnRpdGxlID0gJ1NvY2lhbCB0cmF2ZWwgbW9iaWxlIGFwcCBkZXNpZ24sIFVYIGFuZCByYXBpZCBwcm90b3R5cGluZydcbiAgJHNjb3BlLmltYWdlcyA9IFtcbiAgICB7XG4gICAgICBcImFsdFwiIDogXCJTb21lIGFsdCB0ZXh0XCIsXG4gICAgICBcInVybFwiIDogXCIvaW1nL2ZyYW5jaW5vX3Ryb3VuZC5qcGdcIixcbiAgICAgIFwidGV4dFwiIDogXCJEZXNpZ24gYW4gSW5zdGFncmFtIGJhc2VkIHNvY2lhbCB0cmF2ZWwgYXBwLiBXaHk/IEkgZG9uJ3Qga25vdy5cIlxuICAgIH1cbiAgXVxuXG5GcmFuY2hpbm8uY29udHJvbGxlciBcIlNsaWRlc01vbnRobHlzQ3RybFwiLCAoJHNjb3BlKSAtPlxuICAkc2NvcGUuZGF0ZSA9ICdGRUJSVUFSWSAyMDEzJ1xuICAkc2NvcGUudGl0bGUgPSAnQ3VzdG9tZXIgcG9ydGFsIHBsYXRmb3JtIFVYIGRlc2lnbiBhbmQgZnJvbnQtZW5kJ1xuICAkc2NvcGUuaW1hZ2VzID0gW1xuICAgIHtcbiAgICAgIFwiYWx0XCIgOiBcIlNvbWUgYWx0IHRleHRcIixcbiAgICAgIFwidXJsXCIgOiBcIi9pbWcvZnJhbmNoaW5vLW1vbnRobHlzLWJpejIuanBnXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiYWx0XCIgOiBcIlNvbWUgYWx0IHRleHRcIixcbiAgICAgIFwidXJsXCIgOiBcIi9pbWcvZnJhbmNoaW5vX21vbnRobHlzLmpwZ1wiXG4gICAgfVxuICBdXG5cbkZyYW5jaGluby5jb250cm9sbGVyIFwiU2xpZGVzTW9udGhseXNUd29DdHJsXCIsICgkc2NvcGUpIC0+XG4gICRzY29wZS5kYXRlID0gJ01BUkNIIDIwMTInXG4gICRzY29wZS50aXRsZSA9ICdFbnRyZXByZW5ldXIgaW4gcmVzaWRlbmNlIGF0IExpZ2h0YmFuaydcbiAgJHNjb3BlLmltYWdlcyA9IFtcbiAgICB7XG4gICAgICBcImFsdFwiIDogXCJTb21lIGFsdCB0ZXh0XCIsXG4gICAgICBcInVybFwiIDogXCIvaW1nL2ZyYW5jaGluby1tb250aGx5czcuanBnXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiYWx0XCIgOiBcIlNvbWUgYWx0IHRleHRcIixcbiAgICAgIFwidXJsXCIgOiBcIi9pbWcvZnJhbmNoaW5vLW1vbnRobHlzNS5qcGdcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJhbHRcIiA6IFwiU29tZSBhbHQgdGV4dFwiLFxuICAgICAgXCJ1cmxcIiA6IFwiL2ltZy9mcmFuY2hpbm8tbW9udGhseXMyLmpwZ1wiXG4gICAgfVxuICBdXG5cblxuXG5cbkZyYW5jaGluby5jb250cm9sbGVyICdBYm91dEN0cmwnLCAoJHNjb3BlKSAtPlxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnQXBwQ3RybCcsICgkc2NvcGUpIC0+XG5cbkZyYW5jaGluby5jb250cm9sbGVyICdSZXN1bWVDdHJsJywgKCRzY29wZSkgLT5cbiAgJHNjb3BlLmJsb2IgPSAnPGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJsYXJnZS0xMlwiPjxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwibGFyZ2UtMTIgY29sdW1uc1wiPjxoNj5OT1YgMjAxMyAtIFBSRVNFTlQ8L2g2Pjxici8+PGgyPkh5YnJpZCBFeHBlcmllbmNlIERlc2lnbmVyL0RldmVsb3BlciwgSW5kZXBlbmRlbnQ8L2gyPjxici8+PHA+V29ya2VkIHdpdGggbm90ZWFibGUgZW50cmVwcmVub3VycyBvbiBzZXZlcmFsIG5ldyBwcm9kdWN0IGFuZCBidXNpbmVzcyBsYXVuY2hlcy4gSGVsZCBudW1lcm91cyByb2xlcywgaW5jbHVkaW5nIGNvbnRlbnQgc3RyYXRlZ2lzdCwgdXNlciByZXNlYXJjaGVyLCBkZXNpZ25lciBhbmQgZGV2ZWxvcGVyLiA8L3A+PHA+PHN0cm9uZz5Db21wYW5pZXM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwibm9cIj48bGk+PGEgaHJlZj1cImh0dHA6Ly90YXBjZW50aXZlLmNvbVwiIHRhcmdldD1cIl9ibGFua1wiPlRhcGNlbnRpdmU8L2E+PC9saT48bGk+PGEgaHJlZj1cImh0dHA6Ly9jcGcuaW9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5DUEdpbzwvYT48L2xpPjxsaT48YSBocmVmPVwiaHR0cDovL2tvdS5wbi9cIj5Lb3UucG4gTWVkaWE8L2E+PC9saT48bGk+IDxhIGhyZWY9XCJodHRwOi8vbWVkeWNhdGlvbi5jb21cIiB0YXJnZXQ9XCJfYmxhbmtcIj5NZWR5Y2F0aW9uPC9hPjwvbGk+PGxpPiA8YSBocmVmPVwiaHR0cDovL3d3dy5zdW50aW1lcy5jb20vXCIgdGFyZ2V0PVwiX2JsYW5rXCI+Q2hpY2FnbyBTdW4gVGltZXM8L2E+PC9saT48L3VsPjxici8+PHA+PHN0cm9uZz5UYXBjZW50aXZlIERlbGl2ZXJhYmxlczwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPkNvbXBsZXRlIFRhcGNlbnRpdmUuY29tIG1hcmtldGluZyB3ZWJzaXRlIGFuZCBVWCBvdmVyaGF1bCBvZiBjb3JlIHByb2R1Y3QsIHRoZSBcIlRhcGNlbnRpdmUgTWFuYWdlclwiPC9saT48bGk+SW5kdXN0cmlhbCBkZXNpZ24gb2YgdGhlIFRhcGNlbnRpdmUgVG91Y2hwb2ludDwvbGk+PGxpPkNvbnRlbnQgc3RyYXRlZ3kgZm9yIGNvcnBvcmF0ZSBtYXJrZXRpbmcgc2l0ZTwvbGk+PGxpPk1vYmlsZSBmaXJzdCBtYXJrZXRpbmcgd2Vic2l0ZSB1c2luZyBJb25pYyBhbmQgQW5ndWxhcjwvbGk+PC91bD48cD48c3Ryb25nPkNQR2lvIERlbGl2ZXJhYmxlczwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPlByb2R1Y3QgYW5kIGJ1c2luZXNzIHN0cmF0ZWd5LCB0ZWNobmljYWwgYXJjaGl0ZWN0dXJlIGFuZCBzcGVjaWZpY2F0aW9uIGRlc2lnbjwvbGk+PGxpPk9uZSBodW5kcmVkIHBhZ2UgcHJvcG9zYWwgdGVtcGxhdGUgb24gYnVzaW5lc3MgbW9kZWwgYW5kIGNvcnBvcmF0ZSBjYXBhYmlsaXRpZXM8L2xpPjxsaT5NYXJrZXRpbmcgd2Vic2l0ZSBkZXNpZ24gYW5kIGNvbnRlbnQgc3RyYXRlZ3k8L2xpPjxsaT5Db3JlIHByb2R1Y3QgZGVzaWduIGFuZCBNVlAgZnVuY3Rpb25hbCBwcm90b3R5cGU8L2xpPjwvdWw+PHA+PHN0cm9uZz5Lb3UucG4gRGVsaXZlcmFibGVzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cImJ1bGxldHNcIj48bGk+S291LnBuIE1lZGlhIGJyYW5kIHJlZnJlc2g8L2xpPjxsaT5NYXJrZXRpbmcgc2l0ZSByZWRlc2lnbjwvbGk+PGxpPlBvcnRhbCB1c2VyIGV4cGVyaWVuY2Ugb3ZlcmhhdWw8L2xpPjwvdWw+PHA+PHN0cm9uZz5NZWR5Y2F0aW9uIERlbGl2ZXJhYmxlczwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPkNvbmNlcHR1YWwgZGVzaWduIGFuZCBhcnQgZGlyZWN0aW9uPC9saT48bGk+VXNlciByZXNlYXJjaDwvbGk+PGxpPlJhcGlkIHByb3RvdHlwZXM8L2xpPjwvdWw+PHA+PHN0cm9uZz5DaGljYWdvIFN1biBUaW1lczwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPkNvbmNlcHR1YWwgZGVzaWduIGFuZCBhcnQgZGlyZWN0aW9uPC9saT48bGk+TmF0aXZlIGlPUyBhbmQgQW5kcm9pZCBhcHAgZGVzaWduIGFuZCBqdW5pb3IgZGV2ZWxvcG1lbnQ8L2xpPjxsaT5IeWJyaWQgSW9uaWMvQW5ndWxhciBkZXZlbG9wbWVudDwvbGk+PC91bD48L2Rpdj48L2Rpdj48YnIvPjxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwibGFyZ2UtMTIgY29sdW1uc1wiPjxoNj5NQVJDSCAyMDEwIC0gT0NUT0JFUiAyMDEzPC9oNj48YnIvPjxoMj5EaXJlY3RvciBvZiBVc2VyIEV4cGVyaWVuY2UsIExpZ2h0YmFuazwvaDI+PGJyLz48cD5MYXVuY2hlZCBhbmQgc3VwcG9ydGVkIG11bHRpcGxlIG5ldyBjb21wYW5pZXMgd2l0aGluIHRoZSBMaWdodGJhbmsgcG9ydGZvbGlvLiA8L3A+PHA+PHN0cm9uZz5Db21wYW5pZXM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwibm9cIj48bGk+IDxhIGhyZWY9XCJodHRwOi8vY2hpY2Fnb2lkZWFzLmNvbVwiIHRhcmdldD1cIl9ibGFua1wiPkNoaWNhZ29JZGVhcy5jb208L2E+PC9saT48bGk+IDxhIGhyZWY9XCJodHRwOi8vYmVuY2hwcmVwLmNvbVwiIHRhcmdldD1cIl9ibGFua1wiPkJlbmNoUHJlcC5jb208L2E+PC9saT48bGk+IDxhIGhyZWY9XCJodHRwOi8vc25hcHNoZWV0YXBwLmNvbVwiIHRhcmdldD1cIl9ibGFua1wiPlNuYXBTaGVldEFwcC5jb208L2E+PC9saT48bGk+TW9udGhseXMuY29tIChkZWZ1bmN0KTwvbGk+PGxpPiA8YSBocmVmPVwiaHR0cDovL2RvdWdoLmNvbVwiIHRhcmdldD1cIl9ibGFua1wiPkRvdWdoLmNvbTwvYT48L2xpPjxsaT4gPGEgaHJlZj1cImh0dHA6Ly9ncm91cG9uLmNvbVwiIHRhcmdldD1cIl9ibGFua1wiPkdyb3Vwb24uY29tPC9hPjwvbGk+PC91bD48YnIvPjxwPjxzdHJvbmc+Q2hpY2FnbyBJZGVhcyBEZWxpdmVyYWJsZXM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0c1wiPjxsaT5XZWJzaXRlIGRlc2lnbiByZWZyZXNoLCBhcnQgZGlyZWN0aW9uPC9saT48bGk+Q3VzdG9tIHRpY2tldCBwdXJjaGFzaW5nIHBsYXRmb3JtIFVYIHJlc2VhcmNoICZhbXA7IGRlc2lnbjwvbGk+PGxpPlJ1Ynkgb24gUmFpbHMgZGV2ZWxvcG1lbnQsIG1haW50ZW5lbmNlPC9saT48bGk+R3JhcGhpYyBkZXNpZ24gc3VwcG9ydDwvbGk+PGxpPkFubnVhbCByZXBvcnQgZGVzaWduPC9saT48L3VsPjxwPjxzdHJvbmc+QmVuY2hQcmVwLmNvbSBEZWxpdmVyYWJsZXM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0c1wiPjxsaT5SZS1icmFuZGluZywgY29tcGxldGUgQmVuY2hQcmVwIGlkZW50aXR5IHBhY2thZ2U8L2xpPjxsaT5TdXBwb3J0ZWQgY29tcGFueSB3aXRoIGFsbCBkZXNpZ24gYW5kIHV4IGZyb20gemVybyB0byBlaWdodCBtaWxsaW9uIGluIGZpbmFuY2luZzwvbGk+PGxpPkxlYWQgYXJ0IGFuZCBVWCBkaXJlY3Rpb24gZm9yIHR3byB5ZWFyczwvbGk+PGxpPkZyb250LWVuZCB1c2luZyBCYWNrYm9uZSBhbmQgQm9vdHN0cmFwPC9saT48bGk+VXNlciByZXNlYXJjaCwgZXRobm9ncmFwaGljIHN0dWRpZXMsIHVzZXIgdGVzdGluZzwvbGk+PGxpPkVtYWlsIG1hcmtldGluZyBjYWRlbmNlIHN5c3RlbSBkZXNpZ24gYW5kIGV4ZWN1dGlvbjwvbGk+PGxpPlNjcmlwdGVkLCBzdG9yeWJvYXJkZWQgYW5kIGV4ZWN1dGVkIGJvdGggYW5pbWF0ZWQgYW5kIGxpdmUgbW90aW9uIGV4cGxhaW5lciB2aWRlb3M8L2xpPjwvdWw+PHA+PHN0cm9uZz5TbmFwU2hlZXRBcHAuY29tIERlbGl2ZXJhYmxlczwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPkxhcmdlIHNjYWxlIHBvcnRhbCBVWCByZXNlYXJjaCBhbmQgaW5mb3JtYXRpb24gYXJjaGl0ZWN0dXJlPC9saT48bGk+VGhyZWUgcm91bmRzIG9mIHJhcGlkIHByb3RvdHlwaW5nIGFuZCB1c2VyIHRlc3Rpbmc8L2xpPjxsaT5HcmFwaGljIGRlc2lnbiBhbmQgaW50ZXJhY3Rpb24gZGVzaWduIGZyYW1ld29yazwvbGk+PGxpPlVzZXIgdGVzdGluZzwvbGk+PC91bD48cD48c3Ryb25nPk1vbnRobHlzLmNvbSBEZWxpdmVyYWJsZXM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0c1wiPjxsaT5JZGVudGl0eSBhbmQgYXJ0IGRpcmVjdGlvbjwvbGk+PGxpPlByb2R1Y3Qgc3RyYXRlZ3kgYW5kIG5ldyBjb21wYW55IGxhdW5jaDwvbGk+PGxpPk9ubGluZSBtYXJrZXRpbmcgc3RyYXRlZ3ksIGluY2x1ZGluZyB0cmFuc2FjdGlvbmFsIGVtYWlsLCBwcm9tb3Rpb24gZGVzaWduIGFuZCBsZWFkIGdlbmVyYXRpb248L2xpPjxsaT5Qcm9kdWN0IGV4cGVyaWVuY2UgZGVzaWduIGFuZCBmcm9udC1lbmQ8L2xpPjxsaT5Db250ZW50IHN0cmF0ZWd5PC9saT48bGk+U2NyaXB0ZWQsIHN0b3J5Ym9hcmRlZCBhbmQgZXhlY3V0ZWQgYm90aCBhbmltYXRlZCBhbmQgbGl2ZSBtb3Rpb24gZXhwbGFpbmVyIHZpZGVvczwvbGk+PC91bD48cD48c3Ryb25nPkRvdWdoLmNvbSBEZWxpdmVyYWJsZXM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0cyBidWxsZXRzXCI+PGxpPkNvbnN1bWVyIGpvdXJuZXkgbWFwcGluZyBhbmQgZXRobm9ncmFwaGljIHN0dWRpZXM8L2xpPjxsaT5SYXBpZCBwcm90b3R5cGluZywgY29uY2VwdHVhbCBkZXNpZ248L2xpPjxsaT5NZXNzYWdpbmcgc3RyYXRlZ3ksIHVzZXIgdGVzdGluZzwvbGk+PC91bD48cD48c3Ryb25nPkdyb3Vwb24uY29tIERlbGl2ZXJhYmxlczwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPkVtZXJnaW5nIG1hcmtldHMgcmVzZWFyY2g8L2xpPjxsaT5SYXBpZCBkZXNpZ24gYW5kIHByb3RvdHlwaW5nPC9saT48bGk+VmlzdWFsIGRlc2lnbiBvbiBuZXcgY29uY2VwdHM8L2xpPjxsaT5FbWFpbCBzZWdtZW50YXRpb24gcmVzZWFyY2g8L2xpPjwvdWw+PC9kaXY+PC9kaXY+PGJyLz48ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImxhcmdlLTEyIGNvbHVtbnNcIj48aDY+Tk9WRU1CRVIgMjAwNyAtIEFQUklMIDIwMTA8L2g2Pjxici8+PGgyPkRldmVsb3BlciAmYW1wOyBDby1mb3VuZGVyLCBEaWxseWVvLmNvbTwvaDI+PGJyLz48cD5Dby1mb3VuZGVkLCBkZXNpZ25lZCBhbmQgZGV2ZWxvcGVkIGEgZGFpbHkgZGVhbCBlQ29tbWVyY2Ugd2Vic2l0ZS48L3A+PHA+PHN0cm9uZz5Sb2xlPC9zdHJvbmc+PGJyLz5EZXNpZ25lZCwgZGV2ZWxvcGVkIGFuZCBsYXVuY2hlZCBjb21wYW5pZXMgZmlyc3QgY2FydCB3aXRoIFBIUC4gSXRlcmF0ZWQgYW5kIGdyZXcgc2l0ZSB0byBtb3JlIHRoYW4gdHdvIGh1bmRyZWQgYW5kIGZpZnR5IHRob3VzYW5kIHN1YnNjcmliZXJzIGluIGxlc3MgdGhhbiBvbmUgeWVhci4gPC9wPjxwPjxzdHJvbmc+Tm90ZWFibGUgU3RhdHM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0c1wiPjxsaT5CdWlsdCBhIGxpc3Qgb2YgMjUwLDAwMCBzdWJzY3JpYmVycyBpbiB0aGUgZmlyc3QgeWVhcjwvbGk+PGxpPlBpdm90ZWQgYW5kIHR3ZWFrZWQgZGVzaWduLCBidXNpbmVzcyBhbmQgYXBwcm9hY2ggdG8gMTAwMCB0cmFuc2FjdGlvbnMgcGVyIGRhaWx5PC9saT48bGk+U29sZCBidXNpbmVzcyBpbiBEZWNlbWJlciAyMDA5IHRvIElubm92YXRpdmUgQ29tbWVyY2UgU29sdXRpb25zPC9saT48L3VsPjwvZGl2PjwvZGl2Pjxici8+PGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJsYXJnZS0xMiBjb2x1bW5zXCI+PGg2Pk1BUkNIIDIwMDUgLSBPQ1RPQkVSIDIwMDc8L2g2Pjxici8+PGgyPlNvbHV0aW9ucyBBcmNoaXRlY3QgJmFtcDsgU2VuaW9yIERldmVsb3BlciwgPGEgaHJlZj1cImh0dHA6Ly93d3cubWFuaWZlc3RkaWdpdGFsLmNvbS9cIj5NYW5pZmVzdCBEaWdpdGFsPC9hPjwvaDI+PGJyLz48cD5CdWlsdCBhbmQgbWFuYWdlZCBtdWx0aXBsZSBDYXJlZXJCdWlsZGVyLmNvbSBuaWNoZSBzaXRlcyBmb3IgdGhlIGxhcmdlc3QgaW5kZXBlbmRlbnQgYWdlbmN5IGluIHRoZSBtaWR3ZXN0LjwvcD48cD48c3Ryb25nPlJvbGU8L3N0cm9uZz48YnIvPlJlc2VhcmNoIGFuZCBleHBsb3JlIGVtZXJnaW5nIHRlY2hub2xvZ2llcywgaW1wbGVtZW50IHNvbHV0aW9ucyBhbmQgbWFuYWdlIG90aGVyIGRldmVsb3BlcnMuIFdvcmtlZCB3aXRoIGFzcC5uZXQgb24gYSBkYWlseSBiYXNpcyBmb3IgYWxtb3N0IHR3byB5ZWFycy4gPC9wPjxwPjxzdHJvbmc+Tm90ZWFibGUgQWNjb21wbGlzaG1lbnRzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cImJ1bGxldHNcIj48bGk+UmVjb2duaXplZCBmb3IgbGF1bmNoaW5nIGhpZ2ggcXVhbGl0eSB3ZWIgYXBwIGZvciBDYXJlZXIgQnVpbGRlciBpbiByZWNvcmQgdGltZTwvbGk+PGxpPk1hbmFnZWQgZXh0cmVtZSBTRU8gcHJvamVjdCB3aXRoIG1vcmUgdGhhbiA1MDAgdGhvdXNhbmQgbGlua3MsIHBhZ2VzIGFuZCBvdmVyIDggbWlsbGlvbiBVR0MgYXJ0aWZhY3RzPC9saT48bGk+U2hpZnRlZCBhZ2VuY2llcyBkZXZlbG9wbWVudCBwcmFjdGljZXMgdG8gdmFyaW91cyBuZXcgY2xpZW50LWNlbnRyaWMgQUpBWCBtZXRob2RvbG9naWVzPC9saT48bGk+TWFuYWdlZCBtdWx0aXBsZSBwcm9qZWN0cyBjb25jdXJyZW50bHksIGluY2x1ZGluZyBjaG9vc2VjaGljYWdvLmNvbSBhbmQgYnJpZWZpbmcuY29tPC9saT48L3VsPjwvZGl2PjwvZGl2Pjxici8+PGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJsYXJnZS0xMiBjb2x1bW5zXCI+PGg2PkFQUklMIDIwMDQgLSBKQU5VQVJZIDIwMDc8L2g2Pjxici8+PGgyPkp1bmlvciBQTEQgRGV2ZWxvcGVyLCAgPGEgaHJlZj1cImh0dHA6Ly93d3cubWFuaWZlc3RkaWdpdGFsLmNvbS9cIj5BdmVudWU8L2E+PC9oMj48YnIvPjxwPkZyb250LWVuZCBkZXZlbG9wZXIgYW5kIFVYIGRlc2lnbiBpbnRlcm4gZm9yIEF2ZW51ZSBBIFJhem9yZmlzaHNcXCcgbGVnYWN5IGNvbXBhbnksIEF2ZW51ZS1pbmMuPC9wPjxwPjxzdHJvbmc+Um9sZTwvc3Ryb25nPjxici8+RGV2ZWxvcCBmcm9udC1lbmQgZm9yIG11bHRpcGxlIGNsaWVudCB3ZWJzaXRlcywgaW5jbHVkaW5nIGZsb3IuY29tLCBhY2hpZXZlbWVudC5vcmcsIGNhbnlvbnJhbmNoLmNvbSBhbmQgdHVyYm9jaGVmLjwvcD48cD48c3Ryb25nPk5vdGVhYmxlIEFjY29tcGxpc2htZW50czwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPkV4ZWN1dGVkIGZyb250LWVuZCBwcm9qZWN0cyBvbi10aW1lIGFuZCB1bmRlci1idWRnZXQ8L2xpPjxsaT5Bc3NpZ25lZCBVWCBpbnRlcm5zaGlwIHJvbGUsIHJlY29nbml6ZWQgYnkgZGVzaWduIHRlYW0gYXMgYSB5b3VuZyB0YWxlbnQ8L2xpPjxsaT5XaXJlZnJhbWVkIGN1c3RvbSBzaG9wcGluZyBjYXJ0IHBsYXRmb3JtIGZvciBmbG9yLmNvbTwvbGk+PGxpPkRldmVsb3BlZCBpbnRlcm5hbCBTRU8gcHJhY3RpY2U8L2xpPjwvdWw+PC9kaXY+PC9kaXY+PGJyLz48ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImxhcmdlLTEyIGNvbHVtbnNcIj48aDY+SlVMWSAyMDAwIC0gSkFOVUFSWSAyMDA0PC9oNj48YnIvPjxoMj5lQ29tbWVyY2UgRGV2ZWxvcGVyLCBBdG92YTwvaDI+PGJyLz48cD5HZW5lcmFsIHdlYiBkZXNpZ25lciBhbmQgZGV2ZWxvcGVyIGZvciBmYW1pbHkgb3duZWQgcGFpbnQgZGlzdHJpYnV0aW9uIGJ1c2luZXNzLiA8L3A+PHA+PHN0cm9uZz5Sb2xlPC9zdHJvbmc+PGJyLz5CdWlsdCBzZXZlcmFsIHNob3BwaW5nIGNhcnRzIGluIGNsYXNzaWMgQVNQIGFuZCBQSFAuIEdyZXcgYnVzaW5lc3MgdXNpbmcgb25saW5lIG1hcmtldGluZyBzdHJhdGVnaWVzIHRvIHR3byBtaWxsaW9uIGluIHJldmVudWUuIDwvcD48cD48c3Ryb25nPk5vdGVhYmxlIEFjY29tcGxpc2htZW50czwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPkJlY2FtZSBmaXJzdCBjb21wYW55IHRvIHNoaXAgcGFpbnRzIGFuZCBjb2F0aW5ncyBhY3Jvc3MgdGhlIFVuaXRlZCBTdGF0ZXM8L2xpPjxsaT5GaXJzdCBlbXBsb3llZSwgZGV2ZWxvcGVkIGNvbXBhbnkgdG8gMisgbWlsbGlvbiBpbiByZXZlbnVlIHdpdGggT3ZlcnR1cmUsIEdvb2dsZSBBZHdvcmRzIGFuZCBTRU88L2xpPjxsaT5DcmVhdGVkLCBtYXJrZXRlZCBhbmQgc3Vic2NyaWJlZCB2b2NhdGlvbmFsIHNjaG9vbCBmb3Igc3BlY2lhbHR5IGNvYXRpbmdzPC9saT48bGk+V29ya2VkIHdpdGggdG9wIEl0YWxpYW4gcGFpbnQgbWFudWZhY3R1cmVycyBvdmVyc2VhcyB0byBidWlsZCBleGNsdXNpdmUgZGlzdHJpYnV0aW9uIHJpZ2h0czwvbGk+PC91bD48L2Rpdj48L2Rpdj48YnIvPjxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwibGFyZ2UtMTIgY29sdW1uc1wiPjxoNj5TRVBURU1CRVIgMjAwMCAtIE1BWSAyMDAyPC9oNj48YnIvPjxoMj5FZHVjYXRpb248L2gyPjxici8+PHA+U2VsZiBlZHVjYXRlZCBkZXNpZ25lci9wcm9ncmFtbWVyIHdpdGggdm9jYXRpb25hbCB0cmFpbmluZy4gPC9wPjxwPjxzdHJvbmc+Q2VydGlmaWNhdGlvbnM8L3N0cm9uZz48YnIvPmlORVQrLCBBKyBDZXJ0aWZpY2F0aW9uIDwvcD48cD48c3Ryb25nPkFwcHJlbnRpY2VzaGlwPC9zdHJvbmc+PGJyLz5ZZWFyIGxvbmcgcGVyc29uYWwgYXBwcmVudGljZXNoaXAgd2l0aCBmaXJzdCBlbmdpbmVlciBhdCBBbWF6b24uY29tPC9wPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2Pjxici8+PGJyLz4nXG5cbkZyYW5jaGluby5jb250cm9sbGVyICdKb2JUYXBjZW50aXZlQ3RybCcsICgkc2NvcGUpIC0+XG5cbkZyYW5jaGluby5jb250cm9sbGVyICdKb2JUYXBjZW50aXZlVHdvQ3RybCcsICgkc2NvcGUpIC0+XG5cbkZyYW5jaGluby5jb250cm9sbGVyICdKb2JDcGdpb0N0cmwnLCAoJHNjb3BlKSAtPlxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iTWVkeWNhdGlvbkN0cmwnLCAoJHNjb3BlKSAtPlxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iQ3N0Q3RybCcsICgkc2NvcGUpIC0+XG5cbkZyYW5jaGluby5jb250cm9sbGVyICdKb2JLb3VwbkN0cmwnLCAoJHNjb3BlKSAtPlxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iTWVkeWNhdGlvbkN0cmwnLCAoJHNjb3BlKSAtPlxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iTWVkeWNhdGlvbkN0cmwnLCAoJHNjb3BlKSAtPlxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iVHJvdW5kQ3RybCcsICgkc2NvcGUpIC0+XG5cbkZyYW5jaGluby5jb250cm9sbGVyICdKb2JNb250aGx5c09uZUN0cmwnLCAoJHNjb3BlKSAtPlxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iTW9udGhseXNUd29DdHJsJywgKCRzY29wZSkgLT5cblxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0pvYkJlbmNocHJlcEN0cmwnLCAoJHNjb3BlKSAtPlxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnQ29udGFjdEN0cmwnLCAoJHNjb3BlKSAtPlxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnRGV2ZWxvcGVyc0N0cmwnLCAoJHNjb3BlKSAtPlxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnRGV2ZWxvcGVyQ2VudGVyQ3RybCcsICgkc2NvcGUpIC0+XG5cbkZyYW5jaGluby5jb250cm9sbGVyICdEb2NzQ3RybCcsICgkc2NvcGUsIERvY3MpIC0+XG4gICRzY29wZS4kd2F0Y2ggKC0+IERvY3MubGlzdCksIC0+XG4gICAgJHNjb3BlLmRvY3MgPSBEb2NzLmxpc3RcblxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0RvY0N0cmwnLCAoJHNjb3BlLCAkc2NlLCAkc3RhdGVQYXJhbXMsICR0aW1lb3V0LCBEb2NzKSAtPlxuICAkc2NvcGUuaW5kZXggPSBpZiAkc3RhdGVQYXJhbXMuc3RlcCB0aGVuICRzdGF0ZVBhcmFtcy5zdGVwLTEgZWxzZSAwXG5cbiAgJHNjb3BlLiR3YXRjaCAoLT4gRG9jcy5saXN0KSwgLT5cbiAgICAkc2NvcGUuZG9jID0gRG9jcy5maW5kKCRzdGF0ZVBhcmFtcy5wZXJtYWxpbmspXG4gICAgaWYgJHNjb3BlLmRvY1xuICAgICAgJHNjb3BlLnN0ZXAgPSAkc2NvcGUuZG9jLnN0ZXBzWyRzY29wZS5pbmRleF1cbiAgICAgICRzY29wZS5zdGVwLnVybCA9ICRzY2UudHJ1c3RBc1Jlc291cmNlVXJsKCRzY29wZS5zdGVwLnVybClcblxuICAgICAgaWYgJHNjb3BlLnN0ZXAudHlwZSA9PSAnZGlhbG9nJ1xuICAgICAgICAkc2NvcGUubWVzc2FnZUluZGV4ID0gMFxuICAgICAgICAkc2NvcGUubWVzc2FnZXMgPSBbXVxuICAgICAgICAkdGltZW91dCgkc2NvcGUubmV4dE1lc3NhZ2UsIDEwMDApXG5cbiAgJHNjb3BlLmhhc01vcmVTdGVwcyA9IC0+XG4gICAgaWYgJHNjb3BlLnN0ZXBcbiAgICAgICRzY29wZS5zdGVwLmluZGV4IDwgJHNjb3BlLmRvYy5zdGVwcy5sZW5ndGhcblxuRnJhbmNoaW5vLmRpcmVjdGl2ZSAnbXlTbGlkZXNob3cnLCAtPlxuICByZXN0cmljdDogJ0FDJ1xuICBsaW5rOiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSAtPlxuICAgIGNvbmZpZyA9IGFuZ3VsYXIuZXh0ZW5kKFxuICAgICAgc2xpZGVzOiAnLnNsaWRlJywgIFxuICAgIHNjb3BlLiRldmFsKGF0dHJzLm15U2xpZGVzaG93KSlcbiAgICBzZXRUaW1lb3V0ICgtPlxuICAgICAgJChlbGVtZW50KS5jeWNsZSAtPlxuICAgICAgICBmeDogICAgICdmYWRlJywgXG4gICAgICAgIHNwZWVkOiAgJ2Zhc3QnLFxuICAgICAgICBuZXh0OiAgICcjbmV4dDInLCBcbiAgICAgICAgcHJldjogICAnI3ByZXYyJyxcbiAgICAgICAgY2FwdGlvbjogJyNhbHQtY2FwdGlvbicsXG4gICAgICAgIGNhcHRpb25fdGVtcGxhdGU6ICd7e2ltYWdlcy5hbHR9fScsXG4gICAgICAgIHBhdXNlX29uX2hvdmVyOiAndHJ1ZSdcbiAgICAgICAgICBcbiAgICApLCAwXG4iLCJcbiMgbm90IHN1cmUgaWYgdGhlc2UgYXJlIGFjdHVhbGx5IGluamVjdGluZyBpbnRvIHRoZSBhcHAgbW9kdWxlIHByb3Blcmx5XG5hbmd1bGFyLm1vZHVsZShcInRhcC5jb250cm9sbGVyc1wiLCBbXSlcblxuIyBtb3ZlIGNvbnRyb2xsZXJzIGhlcmVcblxuXG5cblxuIiwiYW5ndWxhci5tb2R1bGUoXCJ0YXAuZGlyZWN0aXZlc1wiLCBbXSlcbiAgLmRpcmVjdGl2ZSBcImRldmljZVwiLCAtPlxuICAgIHJlc3RyaWN0OiBcIkFcIlxuICAgIGxpbms6IC0+XG4gICAgICBkZXZpY2UuaW5pdCgpXG5cbiAgLnNlcnZpY2UgJ2NvcHknLCAoJHNjZSkgLT5cbiAgICBjb3B5ID1cbiAgICAgIGFib3V0OlxuICAgICAgICBoZWFkaW5nOiBcIldlJ3JlIDxzdHJvbmc+dGFwcGluZzwvc3Ryb25nPiBpbnRvIHRoZSBmdXR1cmVcIlxuICAgICAgICBzdWJfaGVhZGluZzogXCJUYXBjZW50aXZlIHdhcyBjcmVhdGVkIGJ5IGEgdGVhbSB0aGF0IGhhcyBsaXZlZCB0aGUgbW9iaWxlIGNvbW1lcmNlIHJldm9sdXRpb24gZnJvbSB0aGUgZWFybGllc3QgZGF5cyBvZiBtQ29tbWVyY2Ugd2l0aCBXQVAsIHRvIGxlYWRpbmcgdGhlIGNoYXJnZSBpbiBtb2JpbGUgcGF5bWVudHMgYW5kIHNlcnZpY2VzIHdpdGggTkZDIHdvcmxkd2lkZS5cIlxuICAgICAgICBjb3B5OiBcIjxwPkZvciB1cywgbW9iaWxlIGNvbW1lcmNlIGhhcyBhbHdheXMgYmVlbiBhYm91dCBtdWNoIG1vcmUgdGhhbiBwYXltZW50OiAgbWFya2V0aW5nLCBwcm9tb3Rpb25zLCBwcm9kdWN0IGNvbnRlbnQsIGFuZCBsb3lhbHR5LCBhbGwgY29tZSB0byBsaWZlIGluc2lkZSBhIG1vYmlsZSBwaG9uZS4gTW9iaWxlIGNvbW1lcmNlIHJlYWxseSBnZXRzIGludGVyZXN0aW5nIHdoZW4gaXQgYnJpZGdlcyB0aGUgZGlnaXRhbCBhbmQgcGh5c2ljYWwgd29ybGRzLjwvcD48cD5PdXIgZ29hbCBhdCBUYXBjZW50aXZlIGlzIHRvIGNyZWF0ZSBhIHN0YXRlLW9mLXRoZS1hcnQgbW9iaWxlIGVuZ2FnZW1lbnQgcGxhdGZvcm0gdGhhdCBlbmFibGVzIG1hcmtldGVycyBhbmQgZGV2ZWxvcGVycyB0byBjcmVhdGUgZW50aXJlbHkgbmV3IGN1c3RvbWVyIGV4cGVyaWVuY2VzIGluIHBoeXNpY2FsIGxvY2F0aW9ucyDigJMgYWxsIHdpdGggYSBtaW5pbXVtIGFtb3VudCBvZiB0ZWNobm9sb2d5IGRldmVsb3BtZW50LjwvcD48cD5XZSB0aGluayB5b3XigJlsbCBsaWtlIHdoYXQgd2XigJl2ZSBidWlsdCBzbyBmYXIuIEFuZCBqdXN0IGFzIG1vYmlsZSB0ZWNobm9sb2d5IGlzIGNvbnN0YW50bHkgZXZvbHZpbmcsIHNvIGlzIHRoZSBUYXBjZW50aXZlIHBsYXRmb3JtLiBHaXZlIGl0IGEgdGVzdCBkcml2ZSB0b2RheS48L3A+XCJcbiAgICAgIHRlYW06XG4gICAgICAgIGhlYWRpbmc6IFwiXCJcbiAgICAgICAgYmlvczpcbiAgICAgICAgICBkYXZlX3JvbGU6IFwiXCJcbiAgICAgICAgICBkYXZlX2NvcHk6IFwiXCJcbiAgICBcblxuXG4gICAgdHJ1c3RWYWx1ZXMgPSAodmFsdWVzKSAtPlxuICAgICAgXy5lYWNoIHZhbHVlcywgKHZhbCwga2V5KSAtPlxuICAgICAgICBzd2l0Y2ggdHlwZW9mKHZhbClcbiAgICAgICAgICB3aGVuICdzdHJpbmcnXG4gICAgICAgICAgICAkc2NlLnRydXN0QXNIdG1sKHZhbClcbiAgICAgICAgICB3aGVuICdvYmplY3QnXG4gICAgICAgICAgICB0cnVzdFZhbHVlcyh2YWwpXG5cbiAgICB0cnVzdFZhbHVlcyhjb3B5KVxuXG4gICAgY29weVxuIiwiaWYgZGV2aWNlLmRlc2t0b3AoKVxuXG5lbHNlIGlmIGRldmljZS5tb2JpbGUoKVxuXG5cdCQgPSBkb2N1bWVudCAjIHNob3J0Y3V0XG5cdGNzc0lkID0gJ215Q3NzJyAjIHlvdSBjb3VsZCBlbmNvZGUgdGhlIGNzcyBwYXRoIGl0c2VsZiB0byBnZW5lcmF0ZSBpZC4uXG5cdGlmICEkLmdldEVsZW1lbnRCeUlkKGNzc0lkKVxuXHQgICAgaGVhZCAgPSAkLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF1cblx0ICAgIGxpbmsgID0gJC5jcmVhdGVFbGVtZW50KCdsaW5rJylcblx0ICAgIGxpbmsuaWQgICA9IGNzc0lkXG5cdCAgICBsaW5rLnJlbCAgPSAnc3R5bGVzaGVldCdcblx0ICAgIGxpbmsudHlwZSA9ICd0ZXh0L2Nzcydcblx0ICAgIGxpbmsuaHJlZiA9ICdodHRwczovL2NvZGUuaW9uaWNmcmFtZXdvcmsuY29tLzEuMC4wLWJldGEuMTMvY3NzL2lvbmljLm1pbi5jc3MnXG5cdCAgICBsaW5rLm1lZGlhID0gJ2FsbCdcblx0ICAgIGhlYWQuYXBwZW5kQ2hpbGQobGluaylcblxuJChkb2N1bWVudCkucmVhZHkgLT5cbiAgJChcIi5oZWFkZXJcIikuc2Nyb2xsVG9GaXhlZFxuICAgIHByZUZpeGVkOiAtPlxuICAgICAgJCh0aGlzKS5maW5kKFwiaDFcIikuY3NzIFwiY29sb3JcIiwgXCJibHVlXCJcbiAgICAgIHJldHVyblxuXG4gICAgcG9zdEZpeGVkOiAtPlxuICAgICAgJCh0aGlzKS5maW5kKFwiaDFcIikuY3NzIFwiY29sb3JcIiwgXCJcIlxuICAgICAgcmV0dXJuXG5cbiAgJChcIiNzdW1tYXJ5XCIpLnNjcm9sbFRvRml4ZWRcbiAgICBtYXJnaW5Ub3A6ICQoXCIuaGVhZGVyXCIpLm91dGVySGVpZ2h0KCkgKyAxMFxuICAgIGxpbWl0OiAkKFwiLmZvb3RlclwiKS5vZmZzZXQoKS50b3AgLSAkKFwiI3N1bW1hcnlcIikub3V0ZXJIZWlnaHQoKSAtIDEwXG4gICAgekluZGV4OiA5OTlcbiAgICBwcmVGaXhlZDogLT5cbiAgICAgICQodGhpcykuZmluZChcIi50aXRsZVwiKS5jc3MgXCJjb2xvclwiLCBcImJsdWVcIlxuICAgICAgcmV0dXJuXG5cbiAgICBwcmVBYnNvbHV0ZTogLT5cbiAgICAgICQodGhpcykuZmluZChcIi50aXRsZVwiKS5jc3MgXCJjb2xvclwiLCBcInJlZFwiXG4gICAgICByZXR1cm5cblxuICAgIHBvc3RGaXhlZDogLT5cbiAgICAgICQodGhpcykuZmluZChcIi50aXRsZVwiKS5jc3MgXCJjb2xvclwiLCBcIlwiXG4gICAgICByZXR1cm5cblxuICAgIHBvc3RBYnNvbHV0ZTogLT5cbiAgICAgICQodGhpcykuZmluZChcIi50aXRsZVwiKS5jc3MgXCJjb2xvclwiLCBcIlwiXG4gICAgICByZXR1cm5cblxuICAkKFwiLmZvb3RlclwiKS5zY3JvbGxUb0ZpeGVkXG4gICAgYm90dG9tOiAwXG4gICAgbGltaXQ6ICQoXCIuZm9vdGVyXCIpLm9mZnNldCgpLnRvcFxuICAgIHByZUZpeGVkOiAtPlxuICAgICAgJCh0aGlzKS5maW5kKFwiaDFcIikuY3NzIFwiY29sb3JcIiwgXCJibHVlXCJcbiAgICAgIHJldHVyblxuXG4gICAgcG9zdEZpeGVkOiAtPlxuICAgICAgJCh0aGlzKS5maW5kKFwiaDFcIikuY3NzIFwiY29sb3JcIiwgXCJcIlxuICAgICAgcmV0dXJuXG5cbiAgcmV0dXJuXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=