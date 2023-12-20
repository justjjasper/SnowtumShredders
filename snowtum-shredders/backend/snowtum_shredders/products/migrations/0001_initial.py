# Generated by Django 4.2.5 on 2023-12-20 05:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Boardbag',
            fields=[
                ('boardbag_id', models.AutoField(primary_key=True, serialize=False)),
                ('boardbag_name', models.CharField(max_length=255)),
                ('boardbag_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('boardbag_size', models.CharField(max_length=255)),
                ('boardbag_description', models.TextField()),
                ('boardbag_sku', models.IntegerField()),
            ],
            options={
                'db_table': 'boardbag',
            },
        ),
        migrations.CreateModel(
            name='Headgear',
            fields=[
                ('headgear_id', models.AutoField(primary_key=True, serialize=False)),
                ('headgear_name', models.CharField(max_length=255)),
                ('headgear_image', models.CharField(max_length=255)),
                ('headgear_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('headgear_description', models.TextField()),
                ('headgear_sku', models.IntegerField()),
            ],
            options={
                'db_table': 'headgear',
            },
        ),
        migrations.CreateModel(
            name='Hoodie',
            fields=[
                ('hoodie_id', models.AutoField(primary_key=True, serialize=False)),
                ('hoodie_name', models.CharField(max_length=255)),
                ('hoodie_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('hoodie_image', models.CharField(max_length=255)),
                ('hoodie_description', models.TextField()),
            ],
            options={
                'db_table': 'hoodies',
            },
        ),
        migrations.CreateModel(
            name='Snowboard',
            fields=[
                ('snowboard_id', models.AutoField(primary_key=True, serialize=False)),
                ('snowboard_name', models.CharField(max_length=255)),
                ('header_image', models.CharField(max_length=255)),
                ('header_description', models.TextField()),
                ('snowboard_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('shape', models.CharField(max_length=255)),
                ('sidecut', models.CharField(max_length=255)),
                ('flex', models.CharField(max_length=255)),
                ('rider_type', models.CharField(max_length=255)),
                ('tech_story', models.TextField()),
                ('camber_type', models.CharField(max_length=255)),
                ('camber_description', models.TextField()),
                ('camber_image', models.CharField(max_length=255)),
                ('video', models.CharField(max_length=255)),
            ],
            options={
                'db_table': 'snowboards',
            },
        ),
        migrations.CreateModel(
            name='TShirt',
            fields=[
                ('tshirt_id', models.AutoField(primary_key=True, serialize=False)),
                ('tshirt_name', models.CharField(max_length=255)),
                ('tshirt_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('tshirt_image', models.CharField(max_length=255)),
                ('tshirt_description', models.TextField()),
            ],
            options={
                'db_table': 'tshirts',
            },
        ),
        migrations.CreateModel(
            name='TShirtSKU',
            fields=[
                ('tshirt_sku_id', models.AutoField(primary_key=True, serialize=False)),
                ('tshirt_size', models.CharField(max_length=255)),
                ('tshirt_sku', models.IntegerField()),
                ('tshirt', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.tshirt')),
            ],
            options={
                'db_table': 'tshirt_skus',
            },
        ),
        migrations.CreateModel(
            name='SnowboardSKU',
            fields=[
                ('snowboard_sku_id', models.AutoField(primary_key=True, serialize=False)),
                ('snowboard_size', models.CharField(max_length=255)),
                ('snowboard_sku', models.IntegerField()),
                ('snowboard', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.snowboard')),
            ],
            options={
                'db_table': 'snowboard_skus',
            },
        ),
        migrations.CreateModel(
            name='SnowboardReview',
            fields=[
                ('review_id', models.AutoField(primary_key=True, serialize=False)),
                ('snowboard_review_title', models.CharField(max_length=255)),
                ('snowboard_review_author', models.CharField(max_length=255)),
                ('snowboard_review_email', models.CharField(max_length=255)),
                ('snowboard_review_date', models.DateField()),
                ('snowboard_review_body', models.TextField()),
                ('snowboard_review_rating', models.IntegerField()),
                ('snowboard', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.snowboard')),
            ],
            options={
                'db_table': 'snowboard_reviews',
            },
        ),
        migrations.CreateModel(
            name='SnowboardImage',
            fields=[
                ('snowboard_image_id', models.AutoField(primary_key=True, serialize=False)),
                ('snowboard_image', models.CharField(max_length=255)),
                ('snowboard', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.snowboard')),
            ],
            options={
                'db_table': 'snowboard_images',
            },
        ),
        migrations.CreateModel(
            name='HoodieSKU',
            fields=[
                ('hoodie_sku_id', models.AutoField(primary_key=True, serialize=False)),
                ('hoodie_size', models.CharField(max_length=255)),
                ('hoodie_sku', models.IntegerField()),
                ('hoodie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.hoodie')),
            ],
            options={
                'db_table': 'hoodie_skus',
            },
        ),
        migrations.CreateModel(
            name='BoardbagImage',
            fields=[
                ('boardbag_image_id', models.AutoField(primary_key=True, serialize=False)),
                ('boardbag_image', models.CharField(max_length=255)),
                ('boardbag', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.boardbag')),
            ],
            options={
                'db_table': 'boardbag_images',
            },
        ),
    ]
