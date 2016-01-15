class Tag < ActiveRecord::Base
  validates :text, presence: true
  validates_uniqueness_of :text 

  has_many :post_tags, dependent: :destroy
  has_many :posts, through: :post_tags  
end
