class PostTag < ActiveRecord::Base
  belongs_to :post
  belongs_to :tag
  validates_presence_of :post, :message => "There isn't a post with that ID"
  validates_presence_of :tag, :message => "There isn't a tag with that ID"
end
