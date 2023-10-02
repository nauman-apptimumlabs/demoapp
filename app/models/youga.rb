class Youga < ApplicationRecord
  has_many :comments, dependent: :destroy
  has_many :exercises, dependent: :nullify
  has_many :users, through: :exercises
  validates :name, presence: true, uniqueness: true
  validates :duration, presence: true, numericality: { greater_than: 0 }
  validates :description, presence: true
  has_one_attached :picture
  enum :status, %w[normal favourite]

  def image_url
    Rails.application.routes.url_helpers.url_for(picture) if picture.attached?
  end

end