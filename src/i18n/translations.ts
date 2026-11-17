import { Language } from '../types/ocop';

export interface UiDictionary {
  brand: string;
  nav: {
    home: string;
    products: string;
    giftBuilder: string;
    stories: string;
    experiences: string;
    findGift: string;
  };
  search: {
    placeholder: string;
    buttonLabel: string;
    allTab: string;
    productsTab: string;
    boxesTab: string;
    noResults: string;
    clearLabel: string;
    quickHintLabel: string;
    viewDetail: string;
    addToCart: string;
    customizeBox: string;
    resultsCountSuffix: string;
  };
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    exploreProducts: string;
    designGiftBox: string;
    statProducts: string;
    statBuilder: string;
    regionCaptionTitle: string;
    regionCaptionDesc: string;
  };
  home: {
    featuredBoxesKicker: string;
    featuredBoxesTitle: string;
    customBoxLink: string;
    chooseBoxBtn: string;
    addBoxToCartBtn: string;
    categoriesKicker: string;
    categoriesTitle: string;
    featuredProductsKicker: string;
    featuredProductsTitle: string;
    viewAllCatalog: string;
    storyHeading: string;
    readMoreStories: string;
    viewExperiences: string;
  };
  productDetail: {
    backToCatalog: string;
    samplePhotoNote: string;
    verifiedPhotoNote: string;
    unverifiedPhotoNote: string;
    imageSourceLabel: string;
    secondaryPhotoHeading: string;
    sampleStockLabel: string;
    inStockSuffix: string;
    outOfStock: string;
    addToCart: string;
    addToGiftBox: string;
    contactMoreBtn: string;
    askAiBtn: string;
    storyHeading: string;
    originHeading: string;
    ocopInfoHeading: string;
    processHeading: string;
    culturalContextHeading: string;
    producerHeading: string;
    viewOnMap: string;
    referencesHeading: string;
    watchVideo: string;
    openGoogleMap: string;
    traceabilityLabel: string;
    readArticle: string;
    readStorySource: string;
    priceRangeLabel: string;
    visitSectionTitle: string;
    visitInviteLead: string;
    visitConfirmedTag: string;
    visitUnconfirmedTag: string;
    visitUnconfirmedText: string;
    visitHoursLabel: string;
    visitDaysLabel: string;
    visitActivitiesLabel: string;
    visitMapGuideLabel: string;
    visitContactLabel: string;
    askVisitQuestionBtn: string;
    askVisitQuestionText: string;
    bookVisitBtn: string;
    updatingLabel: string;
  };
  visitModal: {
    title: string;
    facilityLabel: string;
    dateLabel: string;
    guestsLabel: string;
    nameLabel: string;
    contactLabel: string;
    submitBtn: string;
    disclaimer: string;
    successTitle: string;
    successDesc: string;
    closeBtn: string;
  };
  aiWidget: {
    title: string;
    subtitle: string;
    welcome: string;
    placeholder: string;
    loading: string;
    toggleOpen: string;
    toggleClose: string;
    userLabel: string;
    assistantLabel: string;
    zaloTitle: string;
    zaloAction: string;
    zaloScanTitle: string;
    zaloScanHint: string;
    backToAi: string;
    quickPrompts: string[];
  };
  common: {
    viewDetail: string;
    addToCart: string;
    addToGiftBox: string;
    illustrativePhoto: string;
    verifiedPhotoBadge: string;
    unverifiedPhotoLabel: string;
    updating: string;
    unpriced: string;
    contactMore: string;
    sampleDisclaimerShort: string;
  };
}

export const UI_TEXT: Record<Language, UiDictionary> = {
  vi: {
    brand: 'OCOP Phú Thọ',
    nav: {
      home: 'Trang chủ',
      products: 'Sản phẩm',
      giftBuilder: 'Box quà',
      stories: 'Câu chuyện OCOP',
      experiences: 'Trải nghiệm',
      findGift: 'Thiết kế box quà',
    },
    search: {
      placeholder:
        'Tìm kiếm 27 đặc sản OCOP hoặc 5 box quà (vd: Chè búp tím, Mỳ Hùng Lô, Mật ong, Box Ngọt lành...)',
      buttonLabel: 'Tìm kiếm',
      allTab: 'Tất cả',
      productsTab: 'Sản phẩm',
      boxesTab: 'Box quà',
      noResults: 'Không tìm thấy sản phẩm hoặc box quà phù hợp với từ khóa.',
      clearLabel: 'Xóa',
      quickHintLabel: 'Gợi ý:',
      viewDetail: 'Chi tiết',
      addToCart: 'Thêm vào giỏ',
      customizeBox: 'Tùy chỉnh box',
      resultsCountSuffix: 'kết quả',
    },
    hero: {
      kicker: 'Đặc sản OCOP Phú Thọ · 27 sản phẩm thuộc 3 nhóm',
      title: 'Gửi trọn hương vị Đất Tổ',
      subtitle:
        'Khám phá trọn bộ 27 đặc sản Phú Thọ gồm Trà & đồ uống, Đặc sản khô & nông sản chế biến, cùng Gia vị, mật ong & thực phẩm địa phương. Đầy đủ đơn giá niêm yết, chọn mua lẻ hoặc ghép 5 box quà Đất Tổ.',
      exploreProducts: 'Khám phá 27 sản phẩm',
      designGiftBox: 'Thiết kế box quà',
      statProducts: '27 đặc sản · 3 nhóm',
      statBuilder: '5 box quà gợi ý & tự phối ghép',
      regionCaptionTitle: 'Đặc sản OCOP Phú Thọ – Quà từ Đất Tổ',
      regionCaptionDesc: 'Đầy đủ giá tham khảo, câu chuyện sản phẩm và thông tin cơ sở địa phương',
    },
    home: {
      featuredBoxesKicker: '5 gợi ý phối ghép · Đặc sản Đất Tổ',
      featuredBoxesTitle: 'Box quà gợi ý',
      customBoxLink: 'Tự chọn sản phẩm vào box',
      chooseBoxBtn: 'Tùy chỉnh box',
      addBoxToCartBtn: 'Thêm box vào giỏ',
      categoriesKicker: '3 nhóm đặc sản địa phương',
      categoriesTitle: 'Danh mục sản phẩm',
      featuredProductsKicker: '27 đặc sản Phú Thọ · Ảnh xác thực từ nguồn chính thức',
      featuredProductsTitle: 'Đặc sản tiêu biểu trong danh mục',
      viewAllCatalog: 'Xem đủ 27 sản phẩm',
      storyHeading: 'Câu chuyện từ Đất Tổ',
      readMoreStories: 'Đọc thêm câu chuyện OCOP',
      viewExperiences: 'Xem trải nghiệm',
    },
    productDetail: {
      backToCatalog: 'Quay lại danh mục 27 sản phẩm',
      samplePhotoNote: 'Chưa có ảnh sản phẩm xác thực',
      verifiedPhotoNote: 'Ảnh sản phẩm thực tế từ nguồn chính thức',
      unverifiedPhotoNote:
        'Chưa có ảnh sản phẩm xác thực. Sẽ bổ sung khi nhận được ảnh chính thức từ cơ sở sản xuất.',
      imageSourceLabel: 'Nguồn ảnh',
      secondaryPhotoHeading: 'Ảnh nơi sản xuất / vùng nguyên liệu',
      sampleStockLabel: 'Tình trạng tồn kho',
      inStockSuffix: 'sản phẩm sẵn hàng',
      outOfStock: 'Tạm hết',
      addToCart: 'Thêm vào giỏ hàng',
      addToGiftBox: 'Thêm vào box quà',
      contactMoreBtn: 'Liên hệ để biết thêm',
      askAiBtn: 'Hỏi trợ lý AI về sản phẩm này',
      storyHeading: 'Câu chuyện sản phẩm',
      originHeading: 'Nguồn gốc & vùng nguyên liệu',
      ocopInfoHeading: 'Thông tin chứng nhận OCOP',
      processHeading: 'Quy trình sản xuất',
      culturalContextHeading: 'Giá trị văn hóa & ngữ cảnh địa phương',
      producerHeading: 'Cơ sở sản xuất',
      viewOnMap: 'Xem vị trí',
      referencesHeading: 'Bản đồ, video & bài viết tham khảo',
      watchVideo: 'Xem video giới thiệu',
      openGoogleMap: 'Mở chỉ đường Google Maps',
      traceabilityLabel: 'Truy xuất nguồn gốc sản phẩm',
      readArticle: 'Bài viết báo chí / địa phương',
      readStorySource: 'Nguồn tư liệu câu chuyện',
      priceRangeLabel: 'Theo quy cách đóng gói',
      visitSectionTitle: 'Trải nghiệm tham quan nơi sản xuất',
      visitInviteLead:
        'Thông tin đón khách tham quan được cập nhật theo xác nhận từ hợp tác xã & cơ sở sản xuất.',
      visitConfirmedTag: 'Thông tin tham quan đã xác nhận',
      visitUnconfirmedTag: 'Chủ động hẹn lịch trước khi đến',
      visitUnconfirmedText:
        'Vui lòng liên hệ cơ sở sản xuất trước khi ghé thăm để được sắp xếp lịch đón tiếp chu đáo.',
      visitHoursLabel: 'Khung giờ đón khách',
      visitDaysLabel: 'Ngày đón khách',
      visitActivitiesLabel: 'Hoạt động trải nghiệm',
      visitMapGuideLabel: 'Chỉ dẫn đường đi',
      visitContactLabel: 'Cách liên hệ / đặt lịch',
      askVisitQuestionBtn: 'Tôi có thể đến thăm nơi sản xuất không?',
      askVisitQuestionText: 'Tôi có thể đến thăm nơi sản xuất không?',
      bookVisitBtn: 'Đặt lịch trải nghiệm',
      updatingLabel: 'Theo tiêu chuẩn cơ sở',
    },
    visitModal: {
      title: 'Đặt lịch trải nghiệm',
      facilityLabel: 'Chọn sản phẩm / cơ sở quan tâm',
      dateLabel: 'Ngày dự kiến trải nghiệm',
      guestsLabel: 'Số lượng khách dự kiến',
      nameLabel: 'Họ và tên khách / đoàn',
      contactLabel: 'Số điện thoại khách hàng',
      submitBtn: 'Xác nhận đặt lịch trải nghiệm',
      disclaimer:
        'Thông tin đặt lịch được ghi nhận để hỗ trợ kết nối tham quan cơ sở sản xuất; vui lòng liên hệ trực tiếp với cơ sở để chốt khung giờ đón tiếp.',
      successTitle: 'Đã ghi nhận yêu cầu đặt lịch trải nghiệm',
      successDesc:
        'Thông tin đặt lịch đã được ghi nhận trong phiên. Vui lòng liên hệ cơ sở sản xuất trước khi khởi hành để được đón tiếp chu đáo.',
      closeBtn: 'Đóng',
    },
    aiWidget: {
      title: 'Hướng dẫn viên văn hóa số AI',
      subtitle: 'Tra cứu 27 đặc sản Phú Thọ · VI / EN',
      welcome:
        'Xin chào! Tôi là trợ lý tra cứu danh mục 27 đặc sản Phú Thọ và 5 gợi ý box quà. Bạn có thể hỏi về giá bán, quy cách, chứng nhận OCOP, chỉ đường làng nghề hoặc cách phối ghép box quà biếu tặng.',
      placeholder: 'Hỏi về sản phẩm, giá bán, box quà...',
      loading: 'Đang kiểm tra dữ liệu danh mục...',
      toggleOpen: 'Hỏi trợ lý AI',
      toggleClose: 'Đóng trợ lý',
      userLabel: 'Bạn',
      assistantLabel: 'Trợ lý',
      zaloTitle: 'Tư vấn trực tiếp qua Zalo',
      zaloAction: 'Zalo tư vấn',
      zaloScanTitle: 'Nhân viên tư vấn khách hàng',
      zaloScanHint: 'Mở ứng dụng Zalo và quét mã QR để trò chuyện trực tiếp cùng nhân viên tư vấn khách hàng.',
      backToAi: 'Quay lại Trợ lý AI',
      quickPrompts: [
        'Gợi ý 5 box quà đặc sản Phú Thọ gồm những gì?',
        'Chè búp tím Thanh Ba và Trà Đinh Hoài Trung giá bao nhiêu?',
        'Tôi có thể đến thăm nơi sản xuất Mỳ gạo Hùng Lô không?',
        'Những sản phẩm nào đã có chứng nhận OCOP?',
      ],
    },
    common: {
      viewDetail: 'Xem chi tiết',
      addToCart: 'Thêm vào giỏ',
      addToGiftBox: 'Thêm vào box',
      illustrativePhoto: 'Chưa có ảnh sản phẩm xác thực',
      verifiedPhotoBadge: 'Ảnh sản phẩm xác thực',
      unverifiedPhotoLabel: 'Chưa có ảnh sản phẩm xác thực',
      updating: 'Theo quy cách cơ sở',
      unpriced: 'Giá niêm yết',
      contactMore: 'Liên hệ để biết thêm',
      sampleDisclaimerShort: 'Ảnh xác thực từ nguồn chính thức · Đủ thông tin sản phẩm',
    },
  },
  en: {
    brand: 'OCOP Phú Thọ',
    nav: {
      home: 'Home',
      products: 'Products',
      giftBuilder: 'Gift Boxes',
      stories: 'OCOP Stories',
      experiences: 'Experiences',
      findGift: 'Build Gift Box',
    },
    search: {
      placeholder:
        'Search 27 OCOP specialties or 5 gift boxes (e.g. Purple Bud Tea, Rice Noodles, Honey, Sweet Box...)',
      buttonLabel: 'Search',
      allTab: 'All',
      productsTab: 'Products',
      boxesTab: 'Gift Boxes',
      noResults: 'No matching specialties or gift boxes found.',
      clearLabel: 'Clear',
      quickHintLabel: 'Popular:',
      viewDetail: 'Details',
      addToCart: 'Add to cart',
      customizeBox: 'Customize',
      resultsCountSuffix: 'results',
    },
    hero: {
      kicker: 'Phú Thọ OCOP Specialties · 27 Products in 3 Groups',
      title: 'Share the authentic taste of Đất Tổ',
      subtitle:
        'Browse 27 verified-photo Phú Thọ specialties across Tea & Beverages, Dried Specialties & Produce, and Spices, Honey & Local Foods—complete with retail prices and 5 ready-to-gift box pairings.',
      exploreProducts: 'Explore 27 Products',
      designGiftBox: 'Build a Gift Box',
      statProducts: '27 specialties · 3 groups',
      statBuilder: '5 curated gift boxes & custom builder',
      regionCaptionTitle: 'Phú Thọ OCOP Specialties – Gifts from the Ancestral Land',
      regionCaptionDesc: 'Verified reference pricing, craft stories, and producer locations',
    },
    home: {
      featuredBoxesKicker: '5 Curated Pairings · Đất Tổ Specialties',
      featuredBoxesTitle: 'Suggested Gift Boxes',
      customBoxLink: 'Customize your gift box',
      chooseBoxBtn: 'Customize box',
      addBoxToCartBtn: 'Add box to cart',
      categoriesKicker: '3 Local Product Groups',
      categoriesTitle: 'Product Categories',
      featuredProductsKicker: '27 Phú Thọ Specialties · Verified Official Photos',
      featuredProductsTitle: 'Featured Specialties',
      viewAllCatalog: 'View all 27 products',
      storyHeading: 'Stories from Đất Tổ',
      readMoreStories: 'Read more OCOP stories',
      viewExperiences: 'Explore experiences',
    },
    productDetail: {
      backToCatalog: 'Back to 27-product catalog',
      samplePhotoNote: 'No verified product photo yet',
      verifiedPhotoNote: 'Verified official product photo',
      unverifiedPhotoNote:
        'No verified product photo yet. Official packaging photo pending producer confirmation.',
      imageSourceLabel: 'Image source',
      secondaryPhotoHeading: 'Production site / raw-material region',
      sampleStockLabel: 'Availability',
      inStockSuffix: 'in stock',
      outOfStock: 'Out of stock',
      addToCart: 'Add to cart',
      addToGiftBox: 'Add to gift box',
      contactMoreBtn: 'Contact for more details',
      askAiBtn: 'Ask AI guide about this product',
      storyHeading: 'Product Story',
      originHeading: 'Origin & Sourcing',
      ocopInfoHeading: 'OCOP Certification Info',
      processHeading: 'Production Process',
      culturalContextHeading: 'Cultural & Local Context',
      producerHeading: 'Producer Information',
      viewOnMap: 'View location',
      referencesHeading: 'Maps, Videos & Reference Articles',
      watchVideo: 'Watch introduction video',
      openGoogleMap: 'Open in Google Maps',
      traceabilityLabel: 'Product Traceability Record',
      readArticle: 'Press / Local Portal Article',
      readStorySource: 'Story source document',
      priceRangeLabel: 'Standard pack price',
      visitSectionTitle: 'Production Site Visit',
      visitInviteLead:
        'Visit details are updated according to cooperative and producer guidance.',
      visitConfirmedTag: 'Visit info confirmed',
      visitUnconfirmedTag: 'Book ahead before visiting',
      visitUnconfirmedText:
        'Please contact the producer ahead of time to schedule your workshop or farm visit.',
      visitHoursLabel: 'Visiting hours',
      visitDaysLabel: 'Visiting days',
      visitActivitiesLabel: 'Activities',
      visitMapGuideLabel: 'Directions',
      visitContactLabel: 'Contact & booking',
      askVisitQuestionBtn: 'Can I visit the production site?',
      askVisitQuestionText: 'Can I visit the production site?',
      bookVisitBtn: 'Book Experience',
      updatingLabel: 'By producer standard',
    },
    visitModal: {
      title: 'Book Craft Village Experience',
      facilityLabel: 'Select product / facility',
      dateLabel: 'Preferred experience date',
      guestsLabel: 'Number of visitors',
      nameLabel: 'Visitor / group name',
      contactLabel: 'Customer phone number',
      submitBtn: 'Confirm experience booking',
      disclaimer:
        'Your booking request is recorded to help coordinate your visit; please contact the producer ahead of time to confirm exact receiving hours.',
      successTitle: 'Experience booking request recorded',
      successDesc:
        'Your booking details have been recorded for this session. Please reach out to the producer before traveling.',
      closeBtn: 'Close',
    },
    aiWidget: {
      title: 'Digital Cultural Guide AI',
      subtitle: '27 Phú Thọ Specialties · VI / EN',
      welcome:
        'Hello! Ask me about the 27 Phú Thọ specialties across 3 groups and our 5 curated gift box combinations—including prices, pack weights, OCOP certifications, craft village locations, and pairing ideas.',
      placeholder: 'Ask about products, prices, or gift boxes...',
      loading: 'Checking catalog records...',
      toggleOpen: 'Ask AI Guide',
      toggleClose: 'Close Guide',
      userLabel: 'You',
      assistantLabel: 'Guide',
      zaloTitle: 'Direct Zalo consultation',
      zaloAction: 'Zalo Consultant',
      zaloScanTitle: 'Customer Support Consultant',
      zaloScanHint: 'Open Zalo on your phone and scan this QR code to chat directly with our customer support consultant.',
      backToAi: 'Back to AI Guide',
      quickPrompts: [
        'What are the 5 suggested gift box combinations?',
        'What are the prices of Thanh Ba Purple Bud Tea and Hoai Trung Tea?',
        'Can I visit the Hung Lo rice noodle site?',
        'Which products have confirmed OCOP certifications?',
      ],
    },
    common: {
      viewDetail: 'View details',
      addToCart: 'Add to cart',
      addToGiftBox: 'Add to box',
      illustrativePhoto: 'No verified product photo',
      verifiedPhotoBadge: 'Verified product photo',
      unverifiedPhotoLabel: 'No verified product photo yet',
      updating: 'By producer pack',
      unpriced: 'Listed price',
      contactMore: 'Contact for more',
      sampleDisclaimerShort: 'Verified source photos · Complete catalog',
    },
  },
};
