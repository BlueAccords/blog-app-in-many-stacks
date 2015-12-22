class Tagging < ActiveRecord::Base
  belongs_to :post
  belongs_to :tag

  validates :tag, presence: true
  validates :post, presence: true
  validates :post_id, uniqueness: true
end
