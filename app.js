const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const app = express();

const PORT = 3000;

// Multer storage configuration with custom filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    const productName = req.body.productName.replace(/\s+/g, "-").toLowerCase();
    const fileExt = path.extname(file.originalname);
    const baseName = `${productName}${req.fileIndex || 0}${fileExt}`;

    // Increment the file index for the next file
    req.fileIndex = (req.fileIndex || 0) + 1;

    cb(null, baseName);
  },
});

const upload = multer({ storage: storage, limits: { files: 15 } });

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Render form
app.get("/urun-ekle", (req, res) => {
  res.render("urun-ekle");
});

// Handle form submission
app.post("/urun-ekle", upload.array("images", 15), (req, res) => {
  const {
    productName,
    description,
    oldPrice,
    price,
    accordion1,
    accordion2,
    accordion3,
    accordion4,
    accordion5,
    accordion6,
    accordion1Title,
    accordion2Title,
    accordion3Title,
    accordion4Title,
    accordion5Title,
    accordion6Title,
    content1,
    content2,
    content3Title,
    content3,
    blog1,
    blog1Title,
    blog2Title,
    blog2,
    blog3Title,
    blog3,
  } = req.body;
  const images = req.files.map((file) => `images/${file.filename}`);

  // Generate HTML file for the product
  const productPageContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${productName}</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossorigin="anonymous"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&amp;display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="css/style.css" />
</head>
<body>
    
    <section id="header">
      <nav class="container navbar navbar-expand-lg bg-body-tertiary py-3">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">ABCDE</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item me-2">
                <a class="nav-link active" aria-current="page" href="/"
                  >Ana Sayfa</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="#blog">Blog</a>
              </li>
            </ul>
            <a href="#order" class="btn btn-warning" type="submit">
              <i class="bi bi-bag-check me-1"></i>
              Sipariş Ver
            </a>
          </div>
        </div>
      </nav>
    </section>

    <section id="product" class="container">
      <div
        class="col-12 bg-white d-flex flex-column flex-lg-row align-items-center justify-content-evenly my-4 p-4 py-lg-5 gap-3 gap-lg-0"
      >
        <div class="col-lg-5">
          <div id="carouselExampleCaptions" class="carousel slide">
            <div class="carousel-inner">
               ${images
                 .map(
                   (img, index) =>
                     `<div class="carousel-item${index === 0 ? " active" : ""}">
                        <img src="${img}" class="img-fluid" alt="${productName}">
                        </div>`
                 )
                 .join("")}
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <i class="bi bi-caret-left-fill"></i>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <i class="bi bi-caret-right-fill"></i>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div class="col-lg-5">
          <div
            class="product-info d-flex flex-column align-items-start justify-content-center gap-2"
          >
            <span class="badge bg-dark">Yeni</span>
            <h1>${productName}</h1>
            <p class="desc">
            ${description}
            </p>
            <div
              class="col-12 d-flex flex-row align-items-center justify-content-between"
            >
              <p class="price mb-0">${price}<span>₺</span></p>
              <a href="#order" class="btn btn-warning">
                <i class="bi bi-bag-check me-1"></i>
                Sipariş Ver
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

        <section id="accordion" class="container my-5">
      <div class="text-center mb-4">
        <p class="bold-title my-2">ABCDE <span>Nedir?</span></p>
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
          voluptatibus sint blanditiis dolore id rerum, reiciendis sunt.
        </span>
      </div>
      <div class="row">
        <div class="col-lg-6">
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <i class="bi bi-check2-circle me-1"></i>${accordion1Title}
                </button>
              </h2>
              <div
                id="collapseOne"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                 ${accordion1}
                </div>
              </div>
            </div>
            <div class="accordion-item mt-2">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  <i class="bi bi-check2-circle me-1"></i>${accordion2Title}
                </button>
              </h2>
              <div
                id="collapseTwo"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                 ${accordion2}
                </div>
              </div>
            </div>
            <div class="accordion-item mt-2">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  <i class="bi bi-check2-circle me-1"></i>${accordion3Title}
                </button>
              </h2>
              <div
                id="collapseThree"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  ${accordion3}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="accordion" id="accordionExample2">
            <div class="accordion-item mt-2 mt-lg-0">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="true"
                  aria-controls="collapseFour"
                >
                  <i class="bi bi-check2-circle me-1"></i>${accordion4Title}
                </button>
              </h2>
              <div
                id="collapseFour"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionExample2"
              >
                <div class="accordion-body">
                    ${accordion4}
                </div>
              </div>
            </div>
            <div class="accordion-item mt-2">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFive"
                  aria-expanded="false"
                  aria-controls="collapseFive"
                >
                  <i class="bi bi-check2-circle me-1"></i>${accordion5Title}
                </button>
              </h2>
              <div
                id="collapseFive"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionExample2"
              >
                <div class="accordion-body">
                ${accordion5}
                </div>
              </div>
            </div>
            <div class="accordion-item mt-2">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseSix"
                  aria-expanded="false"
                  aria-controls="collapseSix"
                >
                  <i class="bi bi-check2-circle me-1"></i>${accordion6Title}
                </button>
              </h2>
              <div
                id="collapseSix"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionExample2"
              >
                <div class="accordion-body">
                 ${accordion6}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="order" class="container mb-5 py-4 px-4 p-lg-5">
      <div class="text-center text-white mb-4">
        <p class="bold-title text-white fw-bold mb-2">
          HEMEN FORMU DOLDUR SİPARİŞİNİ VER!
        </p>
        <span class="fw-medium">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
          voluptatibus sint blanditiis dolore id rerum, reiciendis sunt.
        </span>
      </div>
      <div class="row justify-content-evenly gap-4 gap-lg-0">
        <div class="col-lg-5 d-flex justify-content-center align-items-center">
          <img
            src="https://images.pexels.com/photos/6442511/pexels-photo-6442511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Form Görsel"
            class="img-fluid"
            width="400"
            height="400"
          />
        </div>
        <form class="col-lg-6 p-4">
          <div class="mb-3">
            <label for="name" class="form-label">İsim Soyisim</label>
            <input type="text" class="form-control" id="name" />
          </div>
          <div class="mb-3">
            <label for="phone" class="form-label">Telefon No</label>
            <input type="text" class="form-control" id="phone" />
          </div>
          <div class="d-flex align-items-center justify-content-center gap-2">
            <p class="old-price">${oldPrice}<span>₺</span></p>
            <p class="price">${price}<span>₺</span></p>
          </div>
          <div class="d-flex justify-content-center mt-3">
            <button class="btn btn-warning" type="submit">
              <i class="bi bi-bag-check me-1"></i>
              Sipariş Ver
            </button>
          </div>
        </form>
      </div>
    </section>

    <section id="content" class="container my-5 py-4 px-4 p-lg-5">
      <div class="col-12">
        <div
          class="d-flex flex-column flex-lg-row align-items-center justify-content-evenly gap-3 gap-lg-0 mb-4"
        >
          <div class="content-item d-flex align-items-center">
            <i class="bi bi-trophy-fill"></i>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <div class="content-item d-flex align-items-center">
            <i class="bi bi-heart-pulse-fill"></i>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <img
          src="https://images.pexels.com/photos/3823490/pexels-photo-3823490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          class="img-fluid"
          alt="Yaşlı insanlar"
          width="500"
          height="400"
        />
        <p>${content1}</p>
      </div>
      <img
        src="https://images.pexels.com/photos/4057763/pexels-photo-4057763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        class="img-fluid left"
        alt="Yaşlı insanlar"
        width="500"
        height="400"
      />
      <p>
        ${content2}
      </p>
      <div
        class="d-flex flex-column flex-lg-row align-items-center justify-content-evenly my-4"
      >
        <div class="content-item d-flex align-items-center">
          <i class="bi bi-patch-check-fill"></i>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div class="content-item d-flex align-items-center">
          <i class="bi bi-award-fill"></i>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </div>
    </section>

    <section class="py-3" id="text">
      <div class="container p-4">
        <div class="title mb-4 text-center">
          <h2>
            <i class="bi bi-info-circle-fill"></i> ${content3Title}
          </h2>
        </div>
        <div class="text-area">
          <p>
            ${content3}
          </p>
        </div>
      </div>
    </section>

    <section
      id="blog"
      class="container d-flex flex-column align-items-center justify-content-center my-3 my-lg-5"
    >
      <p class="bold-title my-2">ABCDE <span>Blog</span></p>
      <span class="mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex voluptatibus
        sint blanditiis dolore id rerum, reiciendis sunt.
      </span>

      <div
        class="d-flex flex-column flex-lg-row align-items-center justify-content-around gap-3 gap-lg-0"
      >
        <div class="col-lg-3">
          <p>
            <i class="bi bi-chat-left-quote-fill me-2"></i> ${blog1Title}
          </p>
          ${blog1}
        </div>
        <div class="col-lg-3">
          <p>
            <i class="bi bi-chat-left-quote-fill me-2"></i> ${blog2Title}
          </p>
          ${blog2}
        </div>
        <div class="col-lg-3">
          <p>
            <i class="bi bi-chat-left-quote-fill me-2"></i> ${blog3Title}
          </p>
          ${blog3}
        </div>
      </div>
    </section>

    <footer>
      <div
        class="container d-flex align-items-center justify-content-between py-3 px-3 px-lg-5"
      >
        <a href="/" class="navbar-brand">ABCDE</a>
        <p>© 2024 <strong>ABCDE</strong> Tüm hakları saklıdır.</p>
      </div>
    </footer>

        <script
      src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"
      integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
      crossorigin="anonymous"
    ></script>
</body>
</html>`;

  const filePath = path.join(
    __dirname,
    "public",
    `${productName.replace(/\s+/g, "-").toLowerCase()}.html`
  );
  fs.writeFileSync(filePath, productPageContent);

  res.send("Ürün başarıyla eklendi!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
