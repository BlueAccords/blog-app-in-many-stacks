class Post < ActiveRecord::Base
  belongs_to :post

  validates :text, presence: true
end
