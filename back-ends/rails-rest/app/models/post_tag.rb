class PostTag < ActiveRecord::Base
  belongs_to :post
  belongs_to :tag

  validates_existence_of :tag
  validates_existence_of :post

  #validates_uniqueness_of :tag_id, :scope => :post_id
end
