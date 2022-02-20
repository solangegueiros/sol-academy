import React, { useState } from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { NextSeo } from 'next-seo';
import Head from 'next/head';

import { baseUrl } from '@/../seo.config';
import fs from 'fs';
import glob from 'glob';
import matter from 'gray-matter';
import path from 'path';

import { POSTS_PATH, postFilePaths } from '@/utils';

import { B4HHeader, B4HPostView, B4HSidebar } from '@/components/molecules';

export const getStaticPaths = async () => {
  const paths = postFilePaths().map(postPath => ({
    params: {
      slug: [
        `${
          postPath
            .replace(/\/en.mdx?$/, '')
            .replace(/\/es.mdx?$/, '')
            .replace(/\/pt.mdx?$/, '')
            .split('/')[0]
        }`,
        `${
          postPath
            .replace(/\/en.mdx?$/, '')
            .replace(/\/es.mdx?$/, '')
            .replace(/\/pt.mdx?$/, '')
            .split('/')[1]
        }`,
      ],
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ locale, params }: any) => {
  const slug = params.slug as string[];
  const filePath = slug.join('/');

  const possiblePostFile = glob.sync(`${filePath}/${locale}.{md,mdx}`, {
    cwd: POSTS_PATH,
  });

  if (!possiblePostFile || possiblePostFile.length === 0) {
    return {
      notFound: true,
    };
  }

  const source = fs.readFileSync(path.join(POSTS_PATH, possiblePostFile[0]), {
    encoding: 'utf-8',
  });

  const { content, data } = matter(source);

  const mdxSource = await serialize(content);

  if (data.published !== undefined && data.published === false) {
    return {
      notFound: true,
    };
  }

  const ssrTranslations = await serverSideTranslations(locale, ['common']);

  return {
    props: {
      frontmatter: data,
      source: mdxSource,
      slug: params.slug,
      ...ssrTranslations,
    },
  };
};

function Classes({ source, slug, frontmatter }: any) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  function handleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <div>
      <Head>
        <title>b4H Academy</title>
        <link rel="icon" type="image/png" href="/images/favicon.png" />
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        />
      </Head>
      <B4HHeader />
      <main className="md:flex my-8 max-w-screen-xl px-4 mx-auto">
        <NextSeo
          title={frontmatter.title}
          description={frontmatter.description}
          canonical={`${baseUrl}classes/${slug}/`}
          openGraph={{
            url: `${baseUrl}classes/${slug}/`,
            title: frontmatter.title,
            description: frontmatter.description,
            type: 'article',
            article: {
              authors: ['Solange Gueiros'],
            },
          }}
        />
        <B4HSidebar menuOpen={menuOpen} handleMenu={handleMenu} />
        <B4HPostView menuOpen={menuOpen}>
          <p className="text-4xl font-extrabold text-green-600 mb-3">
            {frontmatter.title}
          </p>
          <p className="mb-10">{frontmatter.description}</p>
          <MDXRemote {...source} lazy />
        </B4HPostView>
      </main>
      <footer></footer>
    </div>
  );
}

export default Classes;
