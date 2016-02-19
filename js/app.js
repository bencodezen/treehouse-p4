// ============================================================================
// Photo Gallery Functionality
// ============================================================================

$(function() {
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

  $('body').append(lightboxHTML);

  $('.gallery__item').click(function() {
    var imageUrl = $(this).attr('src').replace('thumbnails/', '');
    var imageCaption = $(this).attr('title');
    var imageId = $(this).attr('data-id');

    $("#lightbox img").attr('src', imageUrl);
    $("#lightbox img").attr('data-id', imageId);
    $("#lightbox figcaption").html(imageCaption);
    $("#lightbox").show();
  });
});