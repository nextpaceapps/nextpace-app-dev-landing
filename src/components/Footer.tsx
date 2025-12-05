import React from 'react';
import styles from './Footer.module.scss';
import type { FooterContent } from './Footer.types';

const Footer: React.FC = () => {
  // Default footer content
  const footerContent: FooterContent = {
    columns: [
      {
        title: '',
        content: {
          type: 'about',
          logo: '[ NEXT PACE DEV ]',
          missionStatement: 'Our mission is to deliver high-speed development solutions that transform ideas into reality. We specialize in rapid MVP development, scalable architecture, and cutting-edge technology implementation. With expertise across web, mobile, and cloud platforms, we help businesses optimize processes, automate workflows, and build innovative digital products that drive growth.'
        }
      },
      {
        title: 'Projects',
        content: {
          type: 'projects',
          links: [
            {
              label: 'Baltic Auto Price',
              href: 'https://balticautoprice.com',
              isExternal: true,
              rel: 'nofollow noopener noreferrer'
            }
          ]
        }
      },
      {
        title: 'Solutions',
        content: {
          type: 'solutions',
          items: [
            'Corporate Process Optimization',
            'Small Business Automation',
            'Custom Web Applications',
            'Mobile App Development',
            'Cloud Infrastructure Setup'
          ]
        }
      },
      {
        title: 'NEXTPACE BLOG',
        content: {
          type: 'blog',
          link: {
            label: 'Visit Blog',
            href: 'https://nextpace.dev/blog',
            isExternal: false
          }
        }
      },
      {
        title: 'Terms',
        content: {
          type: 'terms',
          links: [
            { label: 'Copyright Policy', href: '/copyright', isExternal: false },
            { label: 'Privacy Policy', href: '/privacy', isExternal: false }
          ]
        }
      }
    ],
    copyright: ''
  };

  const renderColumn = (column: typeof footerContent.columns[0], index: number) => {
    switch (column.content.type) {
      case 'about':
        return (
          <div key={index} className={styles.footerColumn}>
            <div className={styles.footerLogo}>{column.content.logo}</div>
            <h3 className={styles.footerTitle}>About Us</h3>
            <p className={styles.footerText}>{column.content.missionStatement}</p>
          </div>
        );
      case 'projects':
        return (
          <div key={index} className={styles.footerColumn}>
            <h3 className={styles.footerTitle}>{column.title}</h3>
            {column.content.links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className={styles.footerLink}
                target={link.isExternal ? '_blank' : undefined}
                rel={link.rel}
                aria-label={link.isExternal ? `${link.label} (opens in new tab)` : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>
        );
      case 'solutions':
        return (
          <div key={index} className={styles.footerColumn}>
            <h3 className={styles.footerTitle}>{column.title}</h3>
            <ul className={styles.footerSolutionsList}>
              {column.content.items.map((item, i) => (
                <li key={i} className={styles.footerSolutionItem}>{item}</li>
              ))}
            </ul>
          </div>
        );
      case 'blog':
        return (
          <div key={index} className={styles.footerColumn}>
            <h3 className={styles.footerTitle}>{column.title}</h3>
            <a
              href={column.content.link.href}
              className={styles.footerLink}
            >
              {column.content.link.label}
            </a>
          </div>
        );
      case 'terms':
        return (
          <div key={index} className={styles.footerColumn}>
            <h3 className={styles.footerTitle}>{column.title}</h3>
            {column.content.links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className={styles.footerLink}
              >
                {link.label}
              </a>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerGrid}>
          {footerContent.columns.map((column, index) => renderColumn(column, index))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

