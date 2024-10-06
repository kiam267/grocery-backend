import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { Type, TypeFindAll } from './entities/type.entity';

import typesJson from '@db/types.json';
import typesJson_1 from '@db/types-1.json';
import Fuse from 'fuse.js';
import { GetTypesDto } from './dto/get-types.dto';

const types = plainToClass(Type, typesJson);
// const typeAll = plainToClass(TypeFindAll, typesJson_1);
// console.log(typeAll);



const options = {
  keys: ['name'],
  threshold: 0.3,
};
const fuse = new Fuse(types, options);

@Injectable()
export class TypesService {
  private types: Type[] = types;
  private typeAll = typesJson_1;

  getTypes({ text, search }: GetTypesDto) {
    let data: Type[] = this.types;
    if (text?.replace(/%/g, '')) {
      data = fuse.search(text)?.map(({ item }) => item);
    }

    if (search) {
      const parseSearchParams = search.split(';');
      const searchText: any = [];
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        // TODO: Temp Solution
        if (key !== 'slug') {
          searchText.push({
            [key]: value,
          });
        }
      }

      data = fuse
        .search({
          $and: searchText,
        })
        ?.map(({ item }) => item);
    }

    return data;
  }

  getTypeBySlug(slug: string): Type {
    console.log('working...');

    return this.types.find((p) => p.slug === slug);
  }

  create(createTypeDto: CreateTypeDto) {
    return this.types[0];
  }

  findAll() {
    console.log('working...2');

    return this.typeAll;
  }

  findOne(id: number) {
    return `This action returns a #${id} type`;
  }

  update(id: number, updateTypeDto: UpdateTypeDto) {
    return this.types[0];
  }

  remove(id: number) {
    return `This action removes a #${id} type`;
  }
}
