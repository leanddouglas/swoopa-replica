from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    tier = Column(String, default="free")
    created_at = Column(DateTime, default=datetime.utcnow)

    search_queries = relationship("SearchQuery", back_populates="user")

class SearchQuery(Base):
    __tablename__ = "search_queries"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    keywords = Column(String)
    max_price = Column(Float, nullable=True)
    platforms = Column(String)
    blocked_keywords = Column(String, nullable=True)
    
    user = relationship("User", back_populates="search_queries")

class Listing(Base):
    __tablename__ = "listings"
    id = Column(Integer, primary_key=True, index=True)
    platform = Column(String, index=True)
    title = Column(String)
    price = Column(Float)
    url = Column(String, unique=True)
    seller_id = Column(String, nullable=True)
    estimated_profit = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
