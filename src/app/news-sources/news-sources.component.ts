import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-sources',
  templateUrl: './news-sources.component.html',
  styleUrls: ['./news-sources.component.scss']
})
export class NewsSourcesComponent implements OnInit {

  sources = [];
  category = '';
  constructor(private newsService: NewsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.category = params.get("cat");
    });

    this.newsService.setCountry('in');
    this.getSources();
  }

  getSources() {
    this.newsService.getSources(this.category).subscribe(
      data => {
        let sourceRow = [];
        for (let i = 0; i < data['sources'].length; i++) {
          sourceRow.push(data['sources'][i]);
          if ((i + 1) % 4 === 0) {
            this.sources.push(sourceRow);
            sourceRow = [];
          }
        }
        if(sourceRow.length > 0) {
          this.sources.push(sourceRow);
        }
        console.log(this.sources);
      },
      err => {
        console.log(err);
      }
    );
  }
}
