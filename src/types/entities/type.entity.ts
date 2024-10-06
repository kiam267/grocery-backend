import { Attachment } from 'src/common/entities/attachment.entity';
import { CoreEntity } from 'src/common/entities/core.entity';

export class Type extends CoreEntity {
  name: string;
  slug: string;
  image: Attachment;
  icon: string;
  banners?: Banner[];
  promotional_sliders?: Attachment[];
  settings?: TypeSettings;
  language: string;
  translated_languages: string[];
}

export class Banner {
  id: number;
  title?: string;
  description?: string;
  image: Attachment;
}

export class TypeSettings {
  isHome: boolean;
  layoutType: string;
  productCard: string;
}

export interface TypeFindAll {
  // NEW: add 9-22-2024
  discountB: [
    {
      click_count: boolean;
      brand_name: string;
      translated_languages: string[];
      location?: string | string[];
      discount_presentence: number;
      discount_price?: number;
      discount_title: string;
      discount_description?: string;
      discount_start_date?: string;
      discount_end_date?: string;
      discount_image_url: string;
      discount_seo_title?: string;
      regular_price?: number;
      slug?: 'big' | 'medium' | 'slider' | 'side' | 'rectangle';
      button_name?: string;
      seo_title?: string;
      shop_link: string;
      shop_name?: string;
      shop_id?: number;
    },
  ];
  discountS: [{}];
  discountA: [{}];
  trendingFood: [{}];
}
