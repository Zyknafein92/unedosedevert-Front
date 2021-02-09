import {Tag} from './tag.model';

export class TagsCategorie {
  id: number;
  name: string;
  tags = new Array<Tag>();
}
