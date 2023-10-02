class User < ApplicationRecord
  has_secure_password
  has_many :comments, dependent: :delete_all
  has_many :exercises
  has_many :yogas, through: :exercises
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, presence: true, length: { minimum: 6 }
end