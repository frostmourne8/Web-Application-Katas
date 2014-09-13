function FakeWishListDataService() {

    this.getWishList = function(character) {
        return new WishList(character);
    }
}
