import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FEATURED_GIFT_BOXES,
  IMAGE_ASSETS,
  SAMPLE_PRODUCTS,
  evaluateGiftBoxPrice,
  getOccasionLabel,
  getProductName,
} from './data/mockOcopData';
import {
  CartItem,
  GiftBoxSelectionItem,
  GiftOccasion,
  Language,
  PageView,
  Product,
  ProductCategory,
} from './types/ocop';
import { Navbar } from './components/Navbar';
import { GlobalSearchBar } from './components/GlobalSearchBar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { VisitBookingModal } from './components/VisitBookingModal';
import { AiAssistantWidget } from './components/AiAssistantWidget';
import { ToastBanner, ToastState } from './components/ToastBanner';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { GiftBoxBuilderPage } from './pages/GiftBoxBuilderPage';
import { StoriesPage } from './pages/StoriesPage';
import { ExperiencesPage } from './pages/ExperiencesPage';

export default function App() {
  const [language, setLanguage] = useState<Language>('vi');
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [products] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [selectedProductId, setSelectedProductId] = useState<string>(
    SAMPLE_PRODUCTS[0].id,
  );
  const [productsInitialCategory, setProductsInitialCategory] = useState<
    ProductCategory | 'Tất cả'
  >('Tất cả');
  const [catalogSearchSeed, setCatalogSearchSeed] = useState<string>('');

  const [giftBoxItems, setGiftBoxItems] = useState<GiftBoxSelectionItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const [visitModalOpen, setVisitModalOpen] = useState(false);
  const [visitProducerId, setVisitProducerId] = useState<string | undefined>(
    undefined,
  );

  const [aiOpen, setAiOpen] = useState(false);
  const [prefilledAiPrompt, setPrefilledAiPrompt] = useState<string | null>(
    null,
  );
  const [aiContextProductId, setAiContextProductId] = useState<
    string | undefined
  >(undefined);
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title =
      language === 'en'
        ? 'OCOP Phú Thọ — Local Specialties & Gift Boxes'
        : 'OCOP Phú Thọ — Đặc sản Đất Tổ & Box quà địa phương';
  }, [language]);

  const showToast = useCallback(
    (message: string, variant: 'success' | 'info' = 'success') => {
      setToast({ id: Date.now(), message, variant });
    },
    [],
  );

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const navigateTo = useCallback((page: PageView) => {
    setCurrentPage(page);
    if (page === 'products') {
      setProductsInitialCategory('Tất cả');
    }
    if (page !== 'product-detail') {
      setAiContextProductId(undefined);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectCategory = (category: ProductCategory) => {
    setProductsInitialCategory(category);
    setCatalogSearchSeed('');
    setCurrentPage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchInCatalog = (keyword: string) => {
    setProductsInitialCategory('Tất cả');
    setCatalogSearchSeed(keyword);
    setCurrentPage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProductId(product.id);
    setAiContextProductId(product.id);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddProductToCart = (product: Product, quantity = 1) => {
    const cartKey = `product:${product.id}`;
    const prodName = getProductName(product, language);
    const subtitle =
      (language === 'en'
        ? product.weightEn ?? product.unitEn ?? product.unit
        : product.weight ?? product.unit) ?? '';

    setCart((prev) => {
      const existing = prev.find((item) => item.cartKey === cartKey);
      if (existing) {
        return prev.map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [
        ...prev,
        {
          cartKey,
          type: 'product',
          productId: product.id,
          name: prodName,
          unitPrice: product.price,
          quantity,
          image: product.image,
          subtitle,
        },
      ];
    });

    showToast(
      language === 'en'
        ? `Added "${prodName}" to your cart.`
        : `Đã thêm "${prodName}" vào giỏ hàng.`,
    );
  };

  const handleAddFeaturedBoxToCart = (boxId: string) => {
    const box = FEATURED_GIFT_BOXES.find((b) => b.id === boxId);
    if (!box) return;
    const boxProducts = box.productIds
      .map((id) => products.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p));
    const priceEval = evaluateGiftBoxPrice(boxProducts);
    const boxName = language === 'en' ? box.nameEn : box.name;
    const cartKey = `featured-box:${box.id}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartKey === cartKey);
      if (existing) {
        return prev.map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [
        ...prev,
        {
          cartKey,
          type: 'custom-box',
          name: boxName,
          unitPrice: priceEval.allFixed ? priceEval.knownFixedTotal : null,
          quantity: 1,
          image: box.image,
          subtitle:
            language === 'en'
              ? `${getOccasionLabel(box.occasion, language)} · ${boxProducts.length} items`
              : `${box.occasion} · ${boxProducts.length} sản phẩm`,
          includedItems: boxProducts.map((p) => ({
            productId: p.id,
            name: getProductName(p, language),
            price: p.price,
            quantity: 1,
          })),
        },
      ];
    });

    showToast(
      language === 'en'
        ? `Added "${boxName}" to your cart.`
        : `Đã thêm "${boxName}" vào giỏ hàng.`,
    );
  };

  const handleAddToGiftBox = (product: Product, quantity = 1) => {
    setGiftBoxItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { product, quantity }];
    });
    const prodName = getProductName(product, language);
    showToast(
      language === 'en'
        ? `Added "${prodName}" to your custom gift box.`
        : `Đã thêm "${prodName}" vào box quà đang thiết kế.`,
    );
  };

  const handleUpdateBoxQuantity = (productId: string, delta: number) => {
    setGiftBoxItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const handleRemoveBoxItem = (productId: string) => {
    setGiftBoxItems((prev) =>
      prev.filter((item) => item.product.id !== productId),
    );
  };

  const handleApplyPresetItems = (items: Product[]) => {
    setGiftBoxItems(items.map((product) => ({ product, quantity: 1 })));
    showToast(
      language === 'en'
        ? `Applied ${items.length} suggested products to your gift box.`
        : `Đã đưa ${items.length} sản phẩm gợi ý vào box quà.`,
    );
  };

  const handleSelectFeaturedBox = (boxId: string) => {
    const box = FEATURED_GIFT_BOXES.find((b) => b.id === boxId);
    if (!box) return;
    const boxProducts = box.productIds
      .map((id) => products.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p));

    setGiftBoxItems(boxProducts.map((product) => ({ product, quantity: 1 })));
    setCurrentPage('gift-builder');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const boxName = language === 'en' ? box.nameEn : box.name;
    showToast(
      language === 'en'
        ? `Opened "${boxName}" in the gift box builder.`
        : `Đã mở "${boxName}" trong trình thiết kế box quà.`,
    );
  };

  const handleAddCustomBoxToCart = (params: {
    boxTitle: string;
    occasion: GiftOccasion;
    items: GiftBoxSelectionItem[];
    totalPrice: number | null;
    giftNote: string;
  }) => {
    const { boxTitle, occasion, items, totalPrice, giftNote } = params;
    const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const cartKey = `custom-box:${Date.now()}`;
    setCart((prev) => [
      ...prev,
      {
        cartKey,
        type: 'custom-box',
        name: boxTitle,
        unitPrice: totalPrice,
        quantity: 1,
        image: IMAGE_ASSETS.giftBox,
        subtitle:
          language === 'en'
            ? `Occasion: ${getOccasionLabel(occasion, language)} · ${totalCount} items`
            : `Dịp: ${occasion} · ${totalCount} sản phẩm`,
        includedItems: items.map((entry) => ({
          productId: entry.product.id,
          name: getProductName(entry.product, language),
          price: entry.product.price,
          priceRange:
            language === 'en'
              ? entry.product.priceRangeEn ?? entry.product.priceRange ?? undefined
              : entry.product.priceRange ?? undefined,
          quantity: entry.quantity,
        })),
        giftNote: giftNote || undefined,
        giftBoxMeta: {
          isAiDesigned: true,
          occasion,
          recipient:
            occasion === 'Biếu gia đình'
              ? 'Gia đình'
              : occasion === 'Đối tác'
                ? 'Đối tác'
                : occasion,
          message: giftNote || '',
        },
      },
    ]);
    showToast(
      language === 'en'
        ? `Added "${boxTitle}" to your cart.`
        : `Đã thêm "${boxTitle}" vào giỏ hàng.`,
    );
    setCartOpen(true);
  };

  const handleConvertGiftBoxToCart = () => {
    if (giftBoxItems.length === 0) return;
    const draftProducts = giftBoxItems.flatMap((entry) =>
      Array.from({ length: entry.quantity }, () => entry.product),
    );
    const evalPrice = evaluateGiftBoxPrice(draftProducts);
    const totalCount = giftBoxItems.reduce((sum, i) => sum + i.quantity, 0);
    const title =
      language === 'en'
        ? `Custom Phú Thọ Gift Box (${totalCount} items)`
        : `Box quà Đất Tổ tự chọn (${totalCount} sản phẩm)`;

    handleAddCustomBoxToCart({
      boxTitle: title,
      occasion: 'Biếu gia đình',
      items: giftBoxItems,
      totalPrice: evalPrice.allFixed ? evalPrice.knownFixedTotal : null,
      giftNote: '',
    });
    setGiftBoxItems([]);
  };

  const handleUpdateCartQuantity = (cartKey: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const handleRemoveCartItem = (cartKey: string) => {
    setCart((prev) => prev.filter((item) => item.cartKey !== cartKey));
  };

  const handleOrderCreated = (orderCode: string) => {
    setCart([]);
    showToast(
      language === 'en'
        ? `Order placed successfully: ${orderCode}`
        : `Đặt hàng thành công: ${orderCode}`,
    );
  };

  const handleAskAi = (prompt: string, contextProductId?: string) => {
    if (contextProductId) {
      setAiContextProductId(contextProductId);
    }
    setPrefilledAiPrompt(prompt);
    setAiOpen(true);
  };

  const handleOpenVisitBooking = (producerId: string) => {
    setVisitProducerId(producerId);
    setVisitModalOpen(true);
  };

  const selectedProduct = useMemo(
    () => products.find((p) => p.id === selectedProductId) ?? products[0],
    [products, selectedProductId],
  );

  const cartQtyMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const item of cart) {
      if (item.productId) {
        map.set(item.productId, (map.get(item.productId) ?? 0) + item.quantity);
      }
    }
    return map;
  }, [cart]);

  const totalCartCount = useMemo(() => {
    const cartQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    const boxQty = giftBoxItems.reduce((sum, item) => sum + item.quantity, 0);
    return cartQty + boxQty;
  }, [cart, giftBoxItems]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfdfc] text-[#1e2a22]">
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        language={language}
        onChangeLanguage={setLanguage}
      />

      <GlobalSearchBar
        products={products}
        language={language}
        onSelectProduct={handleViewProduct}
        onAddProductToCart={(p) => handleAddProductToCart(p, 1)}
        onSelectFeaturedBox={handleSelectFeaturedBox}
        onAddFeaturedBoxToCart={handleAddFeaturedBoxToCart}
        onSearchInCatalog={handleSearchInCatalog}
      />

      <ToastBanner
        toast={toast}
        language={language}
        onDismiss={() => setToast(null)}
      />

      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            products={products}
            language={language}
            cartQtyMap={cartQtyMap}
            giftBoxItems={giftBoxItems}
            onNavigate={navigateTo}
            onSelectCategory={handleSelectCategory}
            onViewProduct={handleViewProduct}
            onAddToCart={(p) => handleAddProductToCart(p, 1)}
            onAddToGiftBox={(p) => handleAddToGiftBox(p, 1)}
            onSelectFeaturedBox={handleSelectFeaturedBox}
            onAddBoxToCart={handleAddFeaturedBoxToCart}
          />
        )}

        {currentPage === 'products' && (
          <ProductsPage
            key={`${productsInitialCategory}-${catalogSearchSeed}`}
            products={products}
            language={language}
            initialCategory={productsInitialCategory}
            initialSearchQuery={catalogSearchSeed}
            giftBoxItems={giftBoxItems}
            cartQtyMap={cartQtyMap}
            onViewProduct={handleViewProduct}
            onAddToCart={(p) => handleAddProductToCart(p, 1)}
            onAddToGiftBox={(p) => handleAddToGiftBox(p, 1)}
            onAddBoxToCart={handleAddFeaturedBoxToCart}
            onSelectFeaturedBox={handleSelectFeaturedBox}
            onGoToGiftBuilder={() => navigateTo('gift-builder')}
          />
        )}

        {currentPage === 'product-detail' && (
          <ProductDetailPage
            product={selectedProduct}
            language={language}
            onBack={() => navigateTo('products')}
            onAddToCart={handleAddProductToCart}
            onAddToGiftBox={handleAddToGiftBox}
            onAskAi={handleAskAi}
            onOpenVisitBooking={handleOpenVisitBooking}
          />
        )}

        {currentPage === 'gift-builder' && (
          <GiftBoxBuilderPage
            products={products}
            language={language}
            giftBoxItems={giftBoxItems}
            onAddProductToBox={handleAddToGiftBox}
            onUpdateBoxQuantity={handleUpdateBoxQuantity}
            onRemoveBoxItem={handleRemoveBoxItem}
            onClearBox={() => setGiftBoxItems([])}
            onApplyPresetItems={handleApplyPresetItems}
            onAddBoxToCart={handleAddFeaturedBoxToCart}
            onAddCustomBoxToCart={handleAddCustomBoxToCart}
          />
        )}

        {currentPage === 'stories' && (
          <StoriesPage language={language} onNavigate={navigateTo} />
        )}

        {currentPage === 'experiences' && (
          <ExperiencesPage
            language={language}
            products={products}
            onAskAi={(p) => handleAskAi(p)}
            onViewProduct={handleViewProduct}
          />
        )}
      </main>

      <Footer language={language} onNavigate={navigateTo} />

      <CartDrawer
        isOpen={cartOpen}
        language={language}
        onClose={() => setCartOpen(false)}
        items={cart}
        products={products}
        giftBoxItems={giftBoxItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onConvertGiftBoxToCart={handleConvertGiftBoxToCart}
        onOpenGiftBuilder={() => navigateTo('gift-builder')}
        onOrderCreated={handleOrderCreated}
      />

      <VisitBookingModal
        key={visitProducerId ?? 'default'}
        isOpen={visitModalOpen}
        onClose={() => setVisitModalOpen(false)}
        language={language}
        products={products}
        defaultProducerId={visitProducerId}
      />

      <AiAssistantWidget
        isOpen={aiOpen}
        onToggle={setAiOpen}
        prefilledPrompt={prefilledAiPrompt}
        onClearPrefilledPrompt={() => setPrefilledAiPrompt(null)}
        language={language}
        onChangeLanguage={setLanguage}
        contextProductId={
          currentPage === 'product-detail' ? aiContextProductId : undefined
        }
      />
    </div>
  );
}
