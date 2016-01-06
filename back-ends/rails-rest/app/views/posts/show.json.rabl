object false

node(:post) {
  partial('posts/post-base', :object => @post)
}