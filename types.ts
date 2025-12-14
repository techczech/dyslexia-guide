import React from 'react';

export type ViewMode = 'home' | 'step' | 'scroll' | 'browser' | 'plan';
export type ContentType = 'knowledge' | 'activity' | 'resource' | 'general';

export interface LessonProps {
  id: string;
  number: number;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isSaved?: boolean;
  onToggleSave?: () => void;
  onShare?: () => void;
}

export interface SectionProps {
  title: string;
  icon: React.ReactNode;
  colorClass: string;
  children: React.ReactNode;
  contentType?: ContentType;
}

export interface TopicCardProps {
  number: number | string;
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  colorClass?: string;
  isSaved?: boolean;
  onToggleSave?: (e: React.MouseEvent) => void;
}

export interface Highlight {
  id: string;
  text: string;
  date: string;
}

// Data Content Types
export interface ListItem {
  id: string;
  content: string;
}

export interface BlockData {
  id?: string;
  type: 'paragraph' | 'list' | 'blockquote' | 'box' | 'heading';
  content?: string;
  items?: ListItem[];
  ordered?: boolean;
  style?: string;
  icon?: string;
}

export interface SectionData {
  id?: string;
  title: string;
  icon: string;
  colorClass: string;
  contentType: ContentType;
  blocks: BlockData[];
}

export interface LessonData {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  sections?: SectionData[];
  blocks?: BlockData[];
}

export interface ContentData {
  lessons: LessonData[];
}