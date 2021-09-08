$(document).ready(function () {

    // Datepicker -------------------------------------

    $('.datepicker-reconciliation').datepicker({
        maxDate: new Date(),
    });

    $('.datepicker-return-date').datepicker({
        maxDate: new Date(),
    });

    // Select 2 ---------------------------------------

    const select2Themes = [
        {
            name: 'select2--theme--outerSpace',
            options: {
                minimumResultsForSearch: -1,
                selectionCssClass : "select2--theme--outerSpace",
            }
        },
        {
            name: 'select2--theme--default',
            options: {
                minimumResultsForSearch: -1,
            }
        },
        {
            name: 'select2--search'
        }
    ];

    $(select2Themes).each(function (key, val) {
        let currentClass = val.name;
        let currentOptions = val.options || {};
        let result = $('.select2').filter(function () {
            return $(this).hasClass(currentClass)
        });

        $(result).select2({width: '100%', ...currentOptions});
    });

    // $(".select2--theme--outerSpace").select2(
    //     {
    //         width: '100%',
    //         minimumResultsForSearch: -1,
    //         selectionCssClass : "select2--theme--outerSpace"
    //     }
    // );


    // Swiper ---------------------------------------

    const galleryThumbs = new Swiper('.gallery__thumbs', {
        spaceBetween: 0,
        slidesPerView: 'auto',
        loop: false,
        freeMode: true,
        loopedSlides: 5, //looped slides should be the same
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
    });

    const galleryTop = new Swiper('.gallery__main', {
        spaceBetween: 0,
        loop: false,
        loopedSlides: 5, //looped slides should be the same
        navigation: {
            nextEl: '.gallery__btn--next',
            prevEl: '.gallery__btn--prev',
        },
        thumbs: {
            swiper: galleryThumbs,
        },
    });

    const carouselWide = new Swiper('.carousel-section--layout--wide .swiper', {
        loop: false,
        slidesPerView: 4,
        slidesPerGroup: 4,
        breakpoints: {
            1600: {
                slidesPerView: 5,
                slidesPerGroup: 5,
            },
            1357: {
                slidesPerView: 4,
                slidesPerGroup: 4,
            },
            788: {
                slidesPerView: 3,
                slidesPerGroup: 3,
            },
            547: {
                slidesPerView: 2,
                slidesPerGroup: 2,
            },
            320: {
                slidesPerView: 1,
                slidesPerGroup: 1,
            }
        }
    });

    const carouselRegular = new Swiper('.carousel-section--layout--regular .swiper', {
        loop: false,
        slidesPerView: 4,
        slidesPerGroup: 4,
        breakpoints: {
            1900: {
                slidesPerView: 6,
                slidesPerGroup: 6,
            },
            1600: {
                slidesPerView: 5,
                slidesPerGroup: 5,
            },
            1357: {
                slidesPerView: 4,
                slidesPerGroup: 4,
            },
            788: {
                slidesPerView: 3,
                slidesPerGroup: 3,
            },
            547: {
                slidesPerView: 2,
                slidesPerGroup: 2,
            },
            320: {
                slidesPerView: 1,
                slidesPerGroup: 1,
            }
        }
    });

    const carouselPlane = new Swiper('.carousel-section--layout--plane .swiper', {
        loop: true,
        slidesPerView: 4,
        slidesPerGroup: 4,
        breakpoints: {
            1900: {
                slidesPerView: 6,
                slidesPerGroup: 6,
            },
            1440: {
                slidesPerView: 5,
                slidesPerGroup: 5,
            },
            1340: {
                slidesPerView: 4,
                slidesPerGroup: 4,
            },
            788: {
                slidesPerView: 3,
                slidesPerGroup: 3,
            },
            547: {
                slidesPerView: 2,
                slidesPerGroup: 2,
            },
            320: {
                slidesPerView: 1,
                slidesPerGroup: 1,
            }
        }
    });

    $('.carousel-section__item').each(function () {
        const arrows = $(this).find('.carousel-section__arrows-btn');
        const carousel = $(this).find('.swiper').prop('swiper');
        const counter = $(this).find('.carousel-section__counter');
        const counterActive = counter.find('.carousel-section__counter-active');
        const counterTotal = counter.find('.carousel-section__counter-total');

        function setSwiperIndex(swiperInstance){
            counterActive.text(setActiveIndex(Math.ceil((swiperInstance.activeIndex + swiperInstance.params.slidesPerView) / swiperInstance.params.slidesPerView)));
            counterTotal.text(setActiveIndex(Math.ceil((swiperInstance.slides.length / swiperInstance.params.slidesPerView))));
        }

        setSwiperIndex(carousel);

        carousel.on('activeIndexChange', function () {
            counterActive.text(setActiveIndex(Math.ceil((carousel.activeIndex + carousel.params.slidesPerView) / carousel.params.slidesPerView)));
        });

        carousel.on('breakpoint', function () {
            setSwiperIndex(carousel);
        });

        function setActiveIndex(index) {
            return index + 1 <= 9? '0' + index: index;
        }

        arrows.click(function () {
            if($(this).hasClass('swiper-next')) {
                carousel.slideNext();
            } else if ($(this).hasClass('swiper-prev')){
                carousel.slidePrev();
            }
        });
    });

    const carouselBrand = new Swiper('.carousel-brands .swiper', {
        spaceBetween: 0,
        slidesPerView: 'auto',
        loop: false,
        freeMode: true,
        loopedSlides: 5, //looped slides should be the same
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        pagination: {
            el: '.swiper__pagination',
        }
    });

    // WOW.js -----------------------------------------

    let wow = new WOW(
        {
            boxClass:     'wow',      // animated element css class (default is wow)
            animateClass: 'animate__animated', // animation css class (default is animated)
            offset:       100,          // distance to the element when triggering the animation (default is 0)
            mobile:       true,       // trigger animations on mobile devices (default is true)
            live:         true,       // act on asynchronously loaded content (default is true)
            callback:     function(box) {
                // the callback is fired every time an animation is started
                // the argument that is passed in is the DOM node being animated
            },
            scrollContainer: null,    // optional scroll container selector, otherwise use window,
            resetAnimation: true,     // reset animation on end (default is true)
        }
    );

    wow.init();

    // siteJS ---------------------------------------

    initLightSelect(".light-select", {
        isSearch: true
    });
});

let siteJS = {
    onload: document.addEventListener('DOMContentLoaded', function () {
        siteJS.init();
        window.addEventListener("resize", siteJS.resizeThrottler, false);
    }),
    resizeTimeout: null,
    resizeThrottler: function(){
        if ( !siteJS.resizeTimeout ) {
            siteJS.resizeTimeout = setTimeout(function() {
                siteJS.resizeTimeout = null;
                siteJS.textBlockOverflow();
                siteJS.productGrid();
            }, 500);
        }
    },
    init() {
        this.sidebarGroup();
        this.typeDisplay();
        this.setRatingMark();
        this.mainMenu();
        this.fixedHeader();
        this.secondaryNav();
        this.headerSearch();
        this.headerDropdown();
        this.modal();
        this.selectAlt();
        this.filterSidebar();
        this.textBlockOverflow();
        this.productGrid();
        this.tableSub();
        this.accordion();
        this.baloonTip();
        this.passwordToggler();
        this.fileAdd();
        this.indexVideo();
    },
    indexVideo: function(){

    },
    fileAdd: function(){
        const wrapper = $('.add-file');

        wrapper.each(function () {

            const inputFile = $(this).find('.add-file__input');
            const addFileBtn = $(this).find('.add-file__btn');
            const fileListOutput = $(this).find('.add-file__list');
            const reset = $(this).find('.add-file__clear');

            reset.click(() => {
                inputFile.value = "";
                fileListOutput
                    .removeClass('active')
                    .find('.add-file__list-item, .add-file__error')
                    .remove();
            })

            addFileBtn.click(() => inputFile.click());

            inputFile.change(function () {

                inputFile.value = "";
                fileListOutput.find('.add-file__list-item, .add-file__error').remove();
                reset.removeClass('hidden');

                const filesArr = Array.from(inputFile.get(0).files);
                const fragment = document.createDocumentFragment();

                const filesSize = filesArr.reduce((acc, {size}) => {
                    return acc + size
                }, 0)

                if(filesSize > 5120000){
                    reset.addClass('hidden');
                    fileListOutput
                        .addClass('active')
                        .append('<div class="add-file__error">File is too big</div>');
                    inputFile.value = "";
                    return;
                }

                filesArr.forEach(({name}) => {
                    $(fragment).append(`<div class="add-file__list-item">${name}</div>`);
                })

                if(inputFile.val()){
                    fileListOutput.prepend(fragment);
                    fileListOutput.addClass('active');
                }
            })
        });
    },
    passwordToggler(){

        const toggleWrap = $('.password-toggle');

        toggleWrap.each(function() {
            const btn = $(this).find('.password-toggle__btn');
            const control = $(this).find('.password-toggle__control');

            btn.click(function() {
                $(this).toggleClass('password-toggle__btn--active')
                let attrValue = control.attr('type') === 'password'? 'text': 'password';
                control.attr('type', attrValue);
            })
        })
    },
    baloonTip(){
        if($(document.body).hasClass("hover-device")){
            const tips = $('.baloon-tip');

            tips.each(function(){
                const tip = $(this);
                const tipTarget = tip.closest('.tip-holder').find('.' + tip.data('tipFor'));
                tipTarget.append(tip)

                tipTarget.mouseenter(function(e){
                    if(!$(e.target).hasClass('baloon-tip')){
                        siteJS.helpers.elemFadeIn(tip, 'baloon-tip--active');
                    }
                })

                tipTarget.mouseleave(function(){
                    siteJS.helpers.elemFadeOut(tip, 'baloon-tip--active');
                })
            })
        }
    },
    accordion(){

        const accordionItem = $('.accordion__item');

        accordionItem.each(function(){
            const currentItem = $(this);
            const title = $(this).find('.accordion__title');
            const body = $(this).find('.accordion__body');

            title.click(function(){
                body.slideToggle({
                    complete: function() {
                        currentItem.toggleClass('accordion__item--active');
                    }
                });
            })
        });

    },
    tableSub(){

        const tableRowToggler = $('.table__row--toggler');
        const tableSubContentBtn = $('.table__dropdown-btn');

        tableRowToggler.click(function (e) {
            e.stopPropagation();

            const currentToggler = $(this);
            const otherTogglers = $('.table__row--toggler').not(currentToggler);
            const currentSubRow = $(this).next('.table__row-sub');
            const otherSubRow = $('.table__row-sub').not(currentSubRow);
            const currentSubContent = currentSubRow.find('.table__cell-sub-content');
            const otherSubContent = $('.table__cell-sub-content').not(currentSubContent);

            if(!$(e.target).closest('.checkbox-radio').length &&
                !($(e.target).prop('tagName').toLowerCase() === 'a') &&
                !($(e.target).closest('.btn').length) &&
                !($(e.target).closest('.table__quantity-input').length)){

                if(currentSubContent.is(":hidden")){
                    currentToggler.addClass('table__row--toggler--active');
                    otherTogglers.removeClass('table__row--toggler--active');

                    currentSubContent.slideDown({
                        complete: function () {
                            $("body,html").animate({
                                scrollTop: $(this).offset().top - $('.header').outerHeight() - $('.table__row--toggler--active').outerHeight() - 60
                            }, 400);
                        }
                    })

                    currentSubContent.slideDown();
                    otherSubContent.slideUp();

                    currentSubRow.addClass('table__row-sub--active');
                    otherSubRow.removeClass('table__row-sub--active');
                } else {
                    currentToggler.removeClass('table__row--toggler--active');
                    currentSubContent.slideUp();
                    currentSubRow.removeClass('table__row-sub--active');
                }

                siteJS.textBlockOverflow();
            }
        })

        tableSubContentBtn.click(function(){
            $(this).closest('.table__cell-sub-content').slideUp();
            $(this).closest('.table__row-sub').prev('.table__row--toggler').removeClass('table__row--toggler--active');
            $(this).closest('.table__row-sub').removeClass('table__row-sub--active');
        })

    },
    productGrid(){

        const wrapper = $('.product-grid');
        const tile = wrapper.find('.product-tile');
        tile.each(function () {
            $(this)
                .removeClass('active')
                .attr('style','');
            $(this)
                .find('.product-tile__primary')
                .attr('style','')
                .css({ minHeight: $(this).find('.product-tile__primary').height() + 'px'});
            $(this)
                .css({ minHeight: $(this).height() + 'px', minWidth: $(this).width() + 'px'});
        });

        if($(document.body).hasClass('hover-device') && !tile.hasClass('size-watch')){
            tile.mouseenter(function () {
                $(this).addClass('active');
            });

            tile.mouseleave(function () {
                const overflowBlock = $(this).find('.text-overflow');
                if(overflowBlock.hasClass('text-overflow--expanded')){
                    overflowBlock.find('.text-overflow__btn').click()
                }
                $(this).removeClass('active');
            });
        } else if ($(document.body).hasClass('touch-device') && !tile.hasClass('size-watch')){
            tile.find('.text-overflow__btn').click(function () {
                const parentTile = $(this).closest('.product-tile');
                parentTile.toggleClass('active');
                tile.not(parentTile).removeClass('active');
            });
        }

        tile.addClass('size-watch');

    },
    textBlockOverflow(target = $('.text-overflow')){

        target.each(function () {

            const current = $(this);

            current.innerHeight('0');
            current.removeClass('text-overflow--expanded');

            const itemLineHeight = parseFloat(window.getComputedStyle(this).lineHeight);
            const itemTextMaxRow = parseInt($(this).data('textMaxRow'));
            let toggler = current.find('.text-overflow__toggle');

            if(!toggler.length){
                current.append(`<div class="text-overflow__toggle">
                                    <div class="text-overflow__btn">
                                        <i class="icon icon--arrow--tiangle--down"></i>
                                        <span>Показать все</span>
                                    </div>
                                </div>`);

                toggler = current.find('.text-overflow__toggle');

                toggler.click(function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    $('.text-block-overflow--active').not(current)
                        .innerHeight(itemLineHeight * itemTextMaxRow + toggler.height() + 'px')
                        // .animate({
                        //     height: itemLineHeight * itemTextMaxRow + toggler.height() + 'px'
                        // }, 200)
                        .removeClass('text-overflow--expanded');

                    if(current.hasClass('text-overflow--expanded')){
                        current
                            .innerHeight(itemLineHeight * itemTextMaxRow + toggler.height() + 'px')
                            // .animate({
                            //     height: itemLineHeight * itemTextMaxRow + toggler.height() + 'px'
                            // }, 200)
                            .removeClass('text-overflow--expanded');
                        toggler.removeClass('active');
                    } else {
                        current
                            .innerHeight($(current).prop('scrollHeight') + toggler.outerHeight() + 'px')
                            // .animate({
                            //     height: $(current).prop('scrollHeight') + toggler.outerHeight() + 'px'
                            // }, 200)
                            .addClass('text-overflow--expanded');
                        toggler.addClass('active');
                    }
                });
            }

            toggler.removeClass('active');

            if(itemLineHeight * itemTextMaxRow <= $(current).prop('scrollHeight')){
                current
                    .innerHeight(itemLineHeight * itemTextMaxRow + toggler.height() + 'px')
                    .addClass('text-block-overflow--active');
                toggler.addClass('text-overflow__toggle--visible');
            } else {
                current.innerHeight($(current).prop('scrollHeight') + 'px');
                toggler.removeClass('text-overflow__toggle--visible');
            }

        });

    },
    filterSidebar(){
        $(document.body).append('<div class="sb-filter-overlay sidebar-toggle"></div>');
        $('.sidebar-toggle, .blog-filter-toggle').click(function () {
            if(!$('.sidebar-filter').hasClass('active')){
                siteJS.helpers.elemFadeIn('.sb-filter-overlay', 'active');
                $('.sidebar-filter').addClass('active');
                $('.content-holder').addClass('sidebar-opened');
            } else {
                siteJS.helpers.elemFadeOut('.sb-filter-overlay', 'active');
                $('.sidebar-filter').removeClass('active');
                $('.content-holder--catalog').removeClass('sidebar-opened');
            }
        });
    },
    selectAlt(){

        const collection = $('.select-alt');

        collection.each(function () {
            $(this).find('.select-alt__textbox-value')
                .text($(this).find('.select-alt__option-item.selected').text());
        });

        collection.each(function () {

            const currentSelect = $(this);
            const textBox = $(this).find('.select-alt__textbox');
            const valueContainer = $(this).find('.select-alt__textbox-value');
            const optionList = $(this).find('.select-alt__option-list');
            const optionItem = $(this).find('.select-alt__option-item');

            textBox.click(function () {
                currentSelect.toggleClass('active');
                if (
                    window.matchMedia('(min-width: 1900px)').matches &&
                    currentSelect.closest('.content-holder__header').length) {
                    currentSelect.removeClass('active');
                    return false;
                }
                const externalOptionLists = $('.select-alt__option-list').not(optionList);
                const externalSelects = $('.select-alt').not(currentSelect);
                siteJS.helpers.elemFadeToggle(optionList, 'active');
                siteJS.helpers.elemFadeOut(externalOptionLists, 'active');
                externalSelects.removeClass('active');
            });

            optionItem.click(function () {
                currentSelect.toggleClass('active');
                optionItem.not($(this)).removeClass('selected');
                $(this).addClass('selected');
                if (
                    window.matchMedia('(min-width: 1900px)').matches &&
                    currentSelect.closest('.content-holder__header').length) {
                    currentSelect.removeClass('active');
                    valueContainer.text($(this).text());
                    return false;
                }
                valueContainer.text($(this).text());
                siteJS.helpers.elemFadeOut(optionList, 'active');
            })

        });

        $(document).bind("mouseup touchend", function (e) {

            const activeSelect = $('.select-alt.active');
            const optionList  = activeSelect.find('.select-alt__option-list');

            if (!activeSelect.is(e.target) &&
                activeSelect.has(e.target).length === 0) {
                activeSelect.removeClass('active');
                if (
                    window.matchMedia('(min-width: 1900px)').matches &&
                    activeSelect.closest('.content-holder__header').length) {
                    activeSelect.removeClass('active');
                    return false;
                }
                siteJS.helpers.elemFadeOut(optionList, 'active');
            }
        });


    },
    modal(){
        const modalBtn = $('[data-modal-id]');
        const modal = $('.modal');

        modalBtn.click(function (e) {
            e.preventDefault();
            const modalTarget = '#' + $(this).data('modalId');
            siteJS.helpers.elemFadeIn(modalTarget, 'active');
        });

        modal.click(function (e) {
            if($(e.target).hasClass('close-modal')){
                siteJS.helpers.elemFadeOut($(this), 'active');
            }
        });
    },
    headerDropdown(){
        if($(document.body).hasClass('hover-device')){
            $('.header__controls-item').mouseenter(function () {
                const dropdown = $(this).find('.header__controls-dropdown');
                if(dropdown.length){
                    siteJS.helpers.elemFadeIn(dropdown, 'active');
                }
            });
            $('.header__controls-item').mouseleave(function () {
                const dropdown = $(this).find('.header__controls-dropdown');
                if(dropdown.length){
                    siteJS.helpers.elemFadeOut(dropdown, 'active');
                }
            })
        } else if($(document.body).hasClass('touch-device')){

            $('.header__controls-item .header__controls-btn').click(function () {
                const dropdown = $(this).closest('.header__controls-item').find('.header__controls-dropdown');
                if(dropdown.length){
                    siteJS.helpers.elemFadeToggle(dropdown, 'active');
                }
            });

            $(document).bind("mouseup touchend", function (e) {
                const dropdown = $('.header__controls-dropdown');

                if (!dropdown.is(e.target) &&
                    dropdown.hasClass('active') &&
                    dropdown.has(e.target).length === 0) {
                    siteJS.helpers.elemFadeOut(dropdown, 'active');
                }
            });
        }
    },
    headerSearch(){
        const headerSearch = $('.header__search');
        const switchEls = $('.header__search-btn, .header__search-close');
        const searchInput = $('.search__input');
        const autocompleteList = $('.search__autocomplete');

        searchInput.on('input', function () {
            if($(this).val().length > 3) {
                siteJS.helpers.elemFadeIn(autocompleteList, 'active');
            } else {
                siteJS.helpers.elemFadeOut(autocompleteList, 'active');
            }
        });

        switchEls.click(function () {
            siteJS.helpers.elemFadeToggle(headerSearch, 'active');
            siteJS.helpers.elemFadeOut(autocompleteList, 'active');
            searchInput.val('');
        });

        $(document).bind("mouseup touchend", function (e) {
            if (window.matchMedia('(max-width: 1259px)').matches) {
                if (!headerSearch.is(e.target) &&
                    headerSearch.hasClass('active') &&
                    headerSearch.has(e.target).length === 0) {
                    siteJS.helpers.elemFadeOut(headerSearch, 'active');
                    siteJS.helpers.elemFadeOut(autocompleteList, 'active');
                    searchInput.val('');
                }
            } else {
                if (!headerSearch.is(e.target) &&
                    headerSearch.has(e.target).length === 0) {
                    siteJS.helpers.elemFadeOut(autocompleteList, 'active');
                }
            }
        });
    },
    secondaryNav() {
        const headerTop = $('.header__top');
        const switchEls = $('.header__controls-item--menu, .contact-panel__close-btn');

        $(switchEls).click(function () {
            if(headerTop.is(':hidden')){
                siteJS.helpers.elemSlideDown(headerTop, 'active');
            } else {
                siteJS.helpers.elemSlideUp(headerTop, 'active');
            }
        });

        $(document).bind("mouseup touchend", function (e) {
            if (window.matchMedia('(max-width: 1259px)').matches) {
                if (!headerTop.is(e.target) &&
                    headerTop.hasClass('active') &&
                    headerTop.has(e.target).length === 0) {
                    siteJS.helpers.elemSlideUp(headerTop, 'active');
                }
            }
        });
    },
    fixedHeader() {
        const header = $('.page__header');
        const headerHeight = header.outerHeight();

        $(window).scroll(function () {
            if ($(this).scrollTop() > 50) {
                $(document.body).css('padding-top', headerHeight + 'px');
                header.addClass('page__header--fixed');
            } else {
                header.removeClass('page__header--fixed');
                $(document.body).attr('style', '');
            }
        });

        $(window).on('load', function () {
            if (header.offset().top > 50) {
                $(document.body).css('padding-top', headerHeight + 'px');
                header.addClass('page__header--fixed');
            }
        });
    },
    mainMenu(){
        $('.page, .page__header').append('<div class="menu-overlay">');

        const switchEls = $('.header__catalog-btn, .main-nav__close-btn, .menu-overlay');
        const mainNav = $('.header__main-nav');

        $(switchEls).click(function () {
            if (window.matchMedia('(min-width: 1000px)').matches){
                if(mainNav.is(':hidden')){
                    siteJS.helpers.elemSlideDown(mainNav, 'active');
                    switchEls.addClass('active');
                } else {
                    siteJS.helpers.elemSlideUp(mainNav, 'active');
                    switchEls.removeClass('active');
                }
            } else {
                mainNav.toggleClass('active');
                $('.menu-overlay').toggleClass('active');
            }
        });
    },
    setRatingMark(){
        $('.item-rating__mark').each(function () {

            const MAX = 5;
            const mark = Math.round(parseFloat($(this).data('mark')));

            for(let i = 1; i <= MAX; i++){
                if(i <= mark){
                    $(this).append('<i class="icon--star--solid item-rating__mark-item item-rating__mark-item--active"></i>');
                    continue;
                }
                $(this).append('<i class="icon--star--solid item-rating__mark-item"></i>');
            }

        });
    },
    sidebarGroup(){
        const sbGroupBtn = $('.sidebar-filter__group-title:not(.disabled)');

        sbGroupBtn.each(function () {
            const sbGroupParent = $(this).closest('.sidebar-filter__group');
            const sbGroupBody = sbGroupParent.find('.sidebar-filter__group-body');

            $(this).click(function () {
                if(sbGroupBody.is(':visible')){
                    $(this).removeClass('active');
                    sbGroupBody.slideUp(200);
                } else {
                    $(this).addClass('active');
                    sbGroupBody.slideDown(200);
                }
            })
        });

    },
    typeDisplay() {
        if ("ontouchstart" in document.documentElement) {
            document.body.classList.add('touch-device');
        } else {
            document.body.classList.add('hover-device');
        }
    },
    helpers: {
        elemSlideUp(elem, removeClass = '', durationTime = 200){
            $(elem).slideUp({
                duration: durationTime,
                done: function () {
                    $(this).removeClass(removeClass).attr('style','');
                }
            });
        },
        elemSlideDown(elem, addClass = '', durationTime = 200){
            $(elem).slideDown({
                duration: durationTime,
                done: function () {
                    $(this).addClass(addClass).attr('style','');
                }
            });
        },
        elemFadeIn(elem, addClass = '', durationTime = 200){
            $(elem).fadeIn({
                duration: durationTime,
                done: function () {
                    $(this).addClass(addClass).attr('style','');
                }
            });
        },
        elemFadeOut(elem, removeClass = '', durationTime = 200){
            $(elem).fadeOut({
                duration: durationTime,
                done: function () {
                    $(this).removeClass(removeClass).attr('style','');
                }
            });
        },
        elemFadeToggle(elem, toggleClass = '', durationTime = 200){
            $(elem).fadeToggle({
                duration: durationTime,
                done: function () {
                    $(this).hasClass(toggleClass)?
                        $(this).removeClass(toggleClass):
                        $(this).addClass(toggleClass);
                    $(this).attr('style','');
                }
            });
        },
        elemSlideToggle(elem, toggleClass = '', durationTime = 200){
            $(elem).slideToggle({
                duration: durationTime,
                done: function () {
                    $(this).hasClass(toggleClass)?
                        $(this).removeClass(toggleClass):
                        $(this).addClass(toggleClass);
                    $(this).attr('style','');
                }
            });
        }
    }
};



