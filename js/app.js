// ============================================================================
// Photo Gallery Functionality
// ============================================================================

$(function() {
  // Declare scaffolding for lightbox
  var lightboxHTML = '<div id="lightbox">';
  lightboxHTML += '<figure id="lightbox__content">';
  lightboxHTML += '<i class="fa fa-chevron-left" id="prev-img"></i>';
  lightboxHTML += '<span class="sr-only">Previous Image</span>';
  lightboxHTML += '<img>';
  lightboxHTML += '<i class="fa fa-chevron-right" id="next-img"></i>';
  lightboxHTML += '<span class="sr-only">Next Image</span>';
  lightboxHTML += '<figcaption></figcaption>'
  lightboxHTML += '</figure>';
  lightboxHTML += '</div>';

  var $photos = $('[data-group=photos]');

  // Add data-id to all items in photo gallery
  $.each($photos, function(index, element) {
    var newIndex = index + 1;
    $(this).attr('data-id', newIndex);
  });

  // Function to allow user to change images
  function changeImage(direction) {
    var $lightboxImg = $("#lightbox img");
    var currentId = parseInt($lightboxImg.attr('data-id'));
    var nextId,
        nextUrl,
        $nextImg;

    if (direction == "next") {
      if (currentId + 1 > $photos.length) {
        nextId = 1;
      } else {
        nextId = currentId + 1;
      }
    } else if (direction == "prev") {
      if (currentId - 1 < 1) {
        nextId = $photos.length;
      } else {
        nextId = currentId - 1;
      }
    }

    $nextImg = $('.gallery__item[data-id=' + nextId + ']');
    nextUrl = $nextImg.attr('src').replace('thumbnails/', '');
    nextCaption = $nextImg.attr('title');

    $lightboxImg.attr('src', nextUrl);
    $lightboxImg.attr('data-id', nextId);
    $("#lightbox figcaption").html(nextCaption);
  }

  // Add lightbox scaffolding to page
  $('body').append(lightboxHTML);

  // Activate and attach appropriate metadata for lightbox content
  $('.gallery__item').click(function() {
    var imageUrl = $(this).attr('src').replace('thumbnails/', '');
    var imageCaption = $(this).attr('title');
    var imageId = $(this).attr('data-id');
    var $lightboxImg = $("#lightbox img");

    $lightboxImg.attr('src', imageUrl);
    $lightboxImg.attr('data-id', imageId);
    $("#lightbox figcaption").html(imageCaption);
    $("#lightbox").show();
  });

  // Bind changeImage to Next button
  $('#next-img').click(function() {
    changeImage("next");
  });

  // Bind changeImage to Previous button
  $("#prev-img").click(function() {
    changeImage("prev");
  });
});