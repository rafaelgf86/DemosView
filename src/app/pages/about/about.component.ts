import { Component, OnInit } from '@angular/core';
import { VersionService } from '../../services/version.service';
import { VersionResult, Version } from '../../interfaces/version';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor( private versionService: VersionService ) { }

  // Loading
  loading = false;
  // Objeto con versión del sistema
  version: Version;

  ngOnInit(): void {
    this.getVersion();
  }

  getVersion() {
    this.loading = true;
    this.versionService.getVersion().then( (data: VersionResult) => {
      if ( !data ) {
        return;
      }
      this.version = data.object;
    }).finally( () => this.loading = false );
  }

}
