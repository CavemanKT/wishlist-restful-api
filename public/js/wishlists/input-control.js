
  const forms = document.getElementsByClassName('needs-validation')
  const validation = Array.prototype.filter.call(forms, function(form) {
    form.addEventListener('submit', function(event) {
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
      form.classList.add('was-validated')
    }, false)
  })

  $('#wishlist-form').on('click', '.add-btn', (e) => {
    const $elem = $(e.target)
    const $parent = $elem.parent()
    const itemCount = $('#wishlist-form ul li').length
    const itemIndex = itemCount - 1

    $parent.before(`
      <li class="list-group-item">
        <button class="btn btn-danger btn-sm delete-btn float-right" type="button"><i class="fas fa-trash"></i></button>
        <h3 class="text-center">Item ${itemCount}</h3>

        <div class="form-group">
          <label>Name</label>
          <input class="form-control" type="text" name="WishlistItems[${itemIndex}][name]">
        </div>

        <div class="form-group">
          <label>Importance</label>
          <select class="form-control" name="WishlistItems[${itemIndex}][importance]">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>

        <div class="form-check">
          <input id="received-${itemIndex}" class="form-check-input" type="checkbox" name="WishlistItems[${itemIndex}][received]">
          <label class="form-check-label" for="received-${itemIndex}">
            Received
          </label>
        </div>
      </li>
    `)
  })

  $('#wishlist-form').on('click', '.delete-btn', (e) => {
    const $elem = $(e.target)
    const $parent = $elem.parentsUntil('ul', 'li')
    $parent.remove()

    const $titleNumbers = $('#wishlist-form ul li h3 span')
    $titleNumbers.each((i, titleNumber) => {
      $(titleNumber).text(i + 1)
    })
  })
