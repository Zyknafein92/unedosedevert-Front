import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../../model/product.model';
import {ProductService} from '../../../../services/product.service';
import {SearchCriteria} from '../../../../model/search-criteria';
import {ActivatedRoute} from '@angular/router';
import {Label} from '../../../../model/label';
import {TagService} from '../../../../services/tag.service';
import {LabelService} from '../../../../services/label.service';
import {Tag} from '../../../../model/tag.model';

@Component({
  selector: 'app-view-all-products',
  templateUrl: './view-all-products.component.html',
  styleUrls: ['./view-all-products.component.css']
})
export class ViewAllProductsComponent implements OnInit {

  products: Array<Product>;
  labels: Array<Label>;
  tags: Array<Tag>;


  constructor(private productService: ProductService, private tagService: TagService, private labelService: LabelService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initLabels();
    this.initTags();
    this.activatedRoute.queryParams.subscribe(
      (params) => {
        console.log(params.typeSearch, params.value);
        const searchCriteria = new SearchCriteria();
        let typeSearch = params.typeSearch;
        let value = params.value;
        console.log(value);
        if (typeSearch === 'cat' && typeSearch != null) {
          searchCriteria.categorie = value;
        }
        if (typeSearch === 'sc' && typeSearch != null) {
          searchCriteria.subCategorie = value;
        }
        if( typeSearch === 'query' && typeSearch != null) {
          searchCriteria.query = value;
        }
        if( typeSearch === 'tag' && typeSearch != null) {
          searchCriteria.tag = value;
        }
        this.initProducts(searchCriteria);
      });
  }

  private initLabels() {
    this.labelService.getLabels().subscribe( data => {
      this.labels = data;
    });
  }

  private initTags() {
    this.tagService.getTags().subscribe( data => {
      this.tags = data;
    });
  }

  filterByLabelValue(label: string) {
    const searchCriteria = new SearchCriteria();
    searchCriteria.label = label
    this.productService.findProductByCriteria(searchCriteria).subscribe( data => {
      this.products = data;
    })
  }

  filterByTagValue(tag: string) {
    const searchCriteria = new SearchCriteria();
    searchCriteria.tag = tag
    this.productService.findProductByCriteria(searchCriteria).subscribe( data => {
      this.products = data;
    })
  }

  private initProducts(searchCriteria: SearchCriteria) {
    this.productService.findProductByCriteria(searchCriteria).subscribe(data => {
      this.products = data;
    });
  }

  filterByReduction() {
    const searchCriteria = new SearchCriteria();
    searchCriteria.reduction = true;
    this.productService.findProductByCriteria(searchCriteria).subscribe( data => {
      this.products = data;
    });
  }
}
