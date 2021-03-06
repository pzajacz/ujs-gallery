import Head from 'next/head';
import Image from 'next/image';
import {useState} from "react";
import axios from "axios";
import cheerio from "cheerio";
import { Swiper, SwiperSlide } from 'swiper/react';
import {Lazy, EffectFlip, EffectFade, EffectCoverflow, EffectCards, EffectCreative, Thumbs, FreeMode, Navigation} from "swiper";
import 'swiper/css';
import 'swiper/css/lazy';
import "swiper/css/effect-cube";
import "swiper/css/effect-creative";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/navigation";

export default function Home() {
  const [gallery, setGallery] = useState(null);
  const [effect, setEffect] = useState('');
  const helpList = [193025, 193018, 193030, 192589, 192593, 192873, 193025, 193018, 193030, 192589];
  const effects = ["fade", "cube", "coverflow", "flip", "cards", "creative"];
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  let swiperProps = {
    modules: [Lazy, EffectFlip, EffectFade, EffectCoverflow, EffectCards, EffectCreative, FreeMode, Thumbs, Navigation],
    spaceBetween: 10,
    slidesPerView: 1,
    touchRatio: 1.5,
    effect: "",
    preloadImages: false,
    thumbs: { swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null },
    creativeEffect:{
      prev: {
        shadow: true,
          translate: [0, 0, -400],
      },
      next: {
        translate: ["100%", 0, 0],
      },
    },
    loop: true,
    lazy: {
      loadPrevNext: true,
      loadPrevNextAmount: 2,
    },
    className: "slider"
  }

  const handleSubmit = async (id)=> {
    const result = await axios.get(`https://ujszo.com/image-gallery/${id}/0`);
    const $ = cheerio.load(result.data);
    const gallery = {
      title: '',
      description: '',
      images: [],
    }
    gallery.title = $('.gallery-title').text().replace('/n', '').trim();
    gallery.description = $('.gallery-description').text().replace('/n', '').trim();
    $('a.thumbnail img').toArray().map(item => {
      gallery.images.push(`https://ujszo.com${item.attribs.src}?webp`);
    })
    setGallery(gallery);
  };

  const wutHandler = (helpList) => {
    handleSubmit(helpList[Math.floor(Math.random() * 10)]).then(r => {
      console.log('Tess??k egy random gal??ria... :)');});
  };

  const resetHandler = ()=> {
    setGallery(null)
  };

  const effectHandler = ()=> {

  }

  return (
    <div className="main">{
    !gallery ?
    (<>
      <Head>
        <title>UJS gallery viewer</title>
        <meta name="description" content="H??p h??p h??p barbatr??kk..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        <div className="gallery-text">
          <h3>UJS gal??riamoderniz??l??k??sz??l??k</h3>
          <p>Yo, tes??, unod az UJS ??skori lass?? gal??riamegjlen??t??s??t?!44!!!44!!!!
            ??n is... ;) Nagyon nagy arc a a frontendese, ismerem... de az??rt na... :D :D
            Sz??val, dobjad be oda a gal??ria ID-t ??s l??ss csod??t! ;)
          </p>
          <p className="explain">https://ujszo.com/image-gallery/<b>EZ A SZ??M KELL</b>/0?nid=664591</p>
        </div>
        <form className="id-form" onSubmit={(e)=> {handleSubmit(e.target.name.value); e.preventDefault()}}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder='Tegyed ide az ID -t...'
            required
          />
          <button type="submit">Naaa muti</button>
        </form>
        <button className="wut-btn" onClick={()=>{wutHandler(helpList)}}>WUT?? Csak adj egy gal??ri??t plz!</button>
      </section>
    </>) : (
      <>
        <h1 className="gallery-title">{gallery.title}</h1>
        <p className="gallery-description">{gallery.description}</p>
        {/*<p>??s effektjeid vannak e?! <button onClick={effectHandler}>Ja.</button></p>*/}
        <button className="back-btn" onClick={resetHandler}>Hey, ez cool! N??zz??nk m??sikat!!</button>

        <Swiper {...swiperProps}>
          {
            gallery.images.map((image, i)=> {
              return <SwiperSlide
                key={i}
              >
                <Image
                  className={'swiper-lazy'}
                  layout={'fill'}
                  src={image} // Route of the image file
                  alt={gallery.title}
                  type={"image/webp"}
                />
              </SwiperSlide>
            })
          }
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          preloadImages={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          modules={[FreeMode, Navigation, Thumbs, Lazy]}
          className="thumbnails"
        >
          {
            gallery.images.map((image, i)=> {
              return <SwiperSlide
                key={i}
              >
                <Image
                  className={'swiper-lazy'}
                  layout={'fill'}
                  src={image} // Route of the image file
                  alt={gallery.title}
                  type={"image/webp"}
                />
              </SwiperSlide>
            })
          }
        </Swiper>
      </>
      )
    }</div>
  )

}
