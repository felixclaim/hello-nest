import { Controller, Get, Param, Query, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { start } from 'repl';
import { count } from 'console';

@Controller()
export class AppController {
  private products = [
    { id: 1, name: "počítač", description: "užasný počítač Lenovo s neuvěřitelnou pamětí atd.", link: "Pocitac.jpg" },
    { id: 2, name: "klávesnice", description: "kvalitní klávesnice od tech atd.", link: "https://d25-a.sdn.cz/d_25/c_img_G_Df/C79Sck.jpeg" },
    { id: 3, name: "nabíjecí kabel", description: "nabije vaš telefon kdekoliv atd.", link: "https://media.hornbach.cz/hb/packshot/as.48244961.jpg?dvid=8" },
    { id: 4, name: "nabíjecí kabel", description: "nabije vaš telefon kdekoliv atd.", link: "https://media.hornbach.cz/hb/packshot/as.48244961.jpg?dvid=8" },
    { id: 5, name: "adaptér", description: "pomůže vám nabít telefon když máte kabel atd.", link: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MU7V2_GEO_EMEA?wid=1144&hei=1144&fmt=jpeg&qlt=95&.v=1544468120362" },
    { id: 6, name: "optický kabel", description: "idk prostě optický kabel atd.", link: "https://www.ipmedia.cz/opticky-kabel-fttx-drop-g-657a-sm-9-125-24-vlaken-venkovni-vnitrni-civka-1000-m_ie97653.jpg" }
  ]
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render("index")
  root(@Query("page") page: number = 1, @Query("count") count: number = 2) {
    const pagecount = Math.ceil(this.products.length / count)
    const pages = new Array(pagecount).fill(1).map((p, i) => i + 1)
    const slicedproducts = this.products.slice((page - 1) * count, ((page - 1) * count) + +count)
    return { message: "Elektro", products: slicedproducts, pages: pages, count: count };
  }


  @Get(":id")
  @Render("detail")
  detail(@Param("id") id) {
    const product = this.products.find(p => p.id == id)
    return { product }
  }

  @Get("hello")
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("hi")
  gethi(): string {
    return this.appService.gethi();
  }
}
